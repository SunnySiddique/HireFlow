import { employerProfileService } from "@/lib/services/employer-profile/employer-profile.service";
import { seekerProfileService } from "@/lib/services/seeker-profile/seeker-profile.service";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const role = searchParams.get("role"); // "job_seeker" | "employer"
  const next = searchParams.get("next") ?? "/";
  const type = searchParams.get("type"); // signin | signup

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/auth/signin`);
  }

  // Set role in metadata
  if (role) {
    await supabase.auth.updateUser({ data: { role } });
  }

  // Fetch both profiles in parallel
  const [existingJobSeeker, existingEmployer] = await Promise.all([
    seekerProfileService(),
    employerProfileService(),
  ]);

  // Shared OAuth metadata
  const oauthAvatar =
    user.user_metadata?.picture || user.user_metadata?.avatar_url || null;

  const oauthName =
    user.user_metadata?.name || user.user_metadata?.user_name || "Unknown User";

  if (role === "job_seeker") {
    if (existingEmployer) {
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/auth/signin?error=role_mismatch`);
    }

    if (existingJobSeeker) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    if (type === "signup") {
      // ✅ No account + came from signup page → create profile
      const { error: insertError } = await supabase.from("job_seekers").upsert({
        auth_id: user.id,
        full_name: oauthName,
        email: user.email,
        role: "job_seeker",
        profile_url: oauthAvatar,
      });

      if (insertError) {
        await supabase.auth.signOut();
        return NextResponse.redirect(
          `${origin}/auth/signup?error=profile_creation_failed`,
        );
      }
    } else {
      // ❌ No account + came from login page → block them
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/auth/signin?error=no_account`);
    }
  } else if (role === "employer") {
    if (existingJobSeeker) {
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/auth/signin?error=role_mismatch`);
    }
    if (existingEmployer) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    if (type === "signup") {
      // ✅ No account + came from signup page → create profile
      const { error: insertError } = await supabase.from("employers").upsert({
        auth_id: user.id,
        company_name:
          user.user_metadata?.company_name || oauthName || "Unknown Company",
        work_email: user.email,
        company_logo_url: oauthAvatar,
        role: "employer",
      });

      if (insertError) {
        await supabase.auth.signOut();
        return NextResponse.redirect(
          `${origin}/auth/signup?error=profile_creation_failed`,
        );
      }
    } else {
      // ❌ No account + came from login page → block them
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/auth/signin?error=no_account`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
