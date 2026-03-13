import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
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

  const { pathname } = request.nextUrl;

  const isAuthRoute = ["/", "/auth/signin", "/auth/signup"].includes(pathname);
  const isJobSeekerRoute = pathname.startsWith("/job-seeker");
  const isEmployerRoute = pathname.startsWith("/employer");
  const isProtectedRoute = isJobSeekerRoute || isEmployerRoute;

  // 1️⃣ Unauthenticated users cannot access protected routes
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  // 2️⃣ Fetch role only if user is logged in
  let userRole: "job_seeker" | "employer" | undefined;

  if (user) {
    const { data: jobSeekerData } = await supabase
      .from("job_seekers")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (jobSeekerData) {
      userRole = "job_seeker";
    } else {
      const { data: employerData } = await supabase
        .from("employers")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (employerData) userRole = "employer";
    }
  }

  // 3️⃣ Logged-in users with a role should not access auth pages
  if (user && userRole && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname =
      userRole === "job_seeker"
        ? "/job-seeker/dashboard"
        : "/employer/dashboard";
    return NextResponse.redirect(url);
  }

  // 4️⃣ Role-based route protection
  if (user && userRole) {
    if (isEmployerRoute && userRole !== "employer") {
      const url = request.nextUrl.clone();
      url.pathname = "/job-seeker/dashboard";
      return NextResponse.redirect(url);
    }

    if (isJobSeekerRoute && userRole !== "job_seeker") {
      const url = request.nextUrl.clone();
      url.pathname = "/employer/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
