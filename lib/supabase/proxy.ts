import {
  AUTH_REDIRECT_ROUTES,
  BYPASS_ROUTES,
  RESTRICTED_EMP_ROUTES,
  RESTRICTED_SEEKER_ROUTES,
} from "@/constants";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { employerProfileService } from "../services/employer-profile/employer-profile.service";
import { seekerProfileService } from "../services/seeker-profile/seeker-profile.service";
import { getSubscription } from "../services/stripe/stripe.service";
import { Database } from "../types/supabase";
import { hasAccess } from "../utils";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  if (BYPASS_ROUTES.some((route) => pathname.startsWith(route)))
    return response;

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isJobSeekerRoute = pathname.startsWith("/job-seeker");
  const isEmployerRoute = pathname.startsWith("/employer");
  const isProtectedRoute = isJobSeekerRoute || isEmployerRoute;
  const isAuthRedirectRoute = AUTH_REDIRECT_ROUTES.includes(pathname);

  // redirect logout users acessing to the dashboard
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  if (!user) return response;

  const [jobSeekerData, employerData, subscription] = await Promise.all([
    seekerProfileService(),
    employerProfileService(),
    getSubscription(user.id),
  ]);

  const userRole: "job-seeker" | "employer" | undefined = jobSeekerData
    ? "job-seeker"
    : employerData
      ? "employer"
      : undefined;

  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );

  // if logged in user tries to access the auth page they redirect to the dashboard based on the role
  if (userRole && isAuthRedirectRoute) {
    const url = request.nextUrl.clone();
    url.pathname =
      userRole === "job-seeker"
        ? "/job-seeker/dashboard"
        : "/employer/dashboard";
    return NextResponse.redirect(url);
  }

  // 5️⃣ Role-based route protection
  if (userRole) {
    if (isEmployerRoute && userRole !== "employer") {
      const url = request.nextUrl.clone();
      url.pathname = "/job-seeker/dashboard";
      return NextResponse.redirect(url);
    }

    if (isJobSeekerRoute && userRole !== "job-seeker") {
      const url = request.nextUrl.clone();
      url.pathname = "/employer/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // 6️⃣ Subscription-gated routes
  const isRestrictedEmpRoute = RESTRICTED_EMP_ROUTES.some((p) =>
    pathname.startsWith(p),
  );
  const isRestrictedSeekerRoute = RESTRICTED_SEEKER_ROUTES.some((p) =>
    pathname.startsWith(p),
  );

  if (!isSubscribed && (isRestrictedEmpRoute || isRestrictedSeekerRoute)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${userRole}/dashboard`;
    return NextResponse.redirect(url);
  }

  // 7️⃣ Premium plan routes
  const isPremiumPlan = userRole === "job-seeker" ? "champion" : "elite";
  const premiumPath =
    userRole === "job-seeker" ? "/job-seeker/companies" : "/employer/talents";

  if (
    isSubscribed &&
    pathname.startsWith(premiumPath) &&
    subscription?.plan?.toLowerCase() !== isPremiumPlan
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${userRole}/dashboard`;
    return NextResponse.redirect(url);
  }

  return response;
}
