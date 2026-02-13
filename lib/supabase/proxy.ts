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

  // Get logged-in user from Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const authRoutes = ["/", "/auth/signin", "/auth/signup"];
  const isAuthRoute = authRoutes.includes(pathname);
  const isJobSeekerRoute = pathname.startsWith("/job-seeker");
  const isEmployerRoute = pathname.startsWith("/employer");

  let userRole: "job_seeker" | "employer" | undefined;

  if (user) {
    // Fetch the role from your database tables
    const { data: jobSeekerData, error: jsError } = await supabase
      .from("job_seekers")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    const { data: employerData, error: empError } = await supabase
      .from("employers")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (jobSeekerData) userRole = "job_seeker";
    else if (employerData) userRole = "employer";
    else userRole = undefined; // User exists but has no role
  }

  // 1️⃣ Logged-in users should not access auth pages or home
  if (user && isAuthRoute) {
    const redirectPath =
      userRole === "job_seeker"
        ? "/job-seeker/dashboard"
        : "/employer/dashboard";
    const url = request.nextUrl.clone();
    url.pathname = redirectPath;
    return NextResponse.redirect(url);
  }

  // 2️⃣ Unauthenticated users cannot access protected routes
  if (!user && (isJobSeekerRoute || isEmployerRoute)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  // 3️⃣ Users with missing or invalid roles
  if (user && !userRole) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  // 4️⃣ Role-based route protection
  if (user && userRole) {
    // Job seeker trying to access employer routes
    if (isEmployerRoute && userRole !== "employer") {
      const url = request.nextUrl.clone();
      url.pathname = "/job-seeker/dashboard";
      return NextResponse.redirect(url);
    }

    // Employer trying to access job seeker routes
    if (isJobSeekerRoute && userRole !== "job_seeker") {
      const url = request.nextUrl.clone();
      url.pathname = "/employer/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
