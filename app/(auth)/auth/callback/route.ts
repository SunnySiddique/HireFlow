import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const role = searchParams.get("role"); // job_seeker or employer

  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const email = user?.email;

      if (!email) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/auth/signin`);
      }

      if (role === "job_seeker") {
        const { data } = await supabase
          .from("job_seekers")
          .select("id")
          .eq("email", email)
          .single();

        if (!data) {
          await supabase.auth.signOut();
          return NextResponse.redirect(
            `${origin}/auth/signin?error=role_mismatch`,
          );
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
