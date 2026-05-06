import { createClient } from "@/lib/supabase/server";
import { ServiceResult } from "@/types";
import { EmployerAuth, JobSeekerAuth } from "@/types/auth";

// ─── Create User ───────────────────────────────────────────────
export async function createUserService(
  role: "job_seeker" | "employer",
  input: JobSeekerAuth | EmployerAuth,
): Promise<ServiceResult<object>> {
  const supabase = await createClient();

  let signupPayload;

  if (role === "job_seeker") {
    const { fullName, email, password } = input as JobSeekerAuth;
    if (!password) return { success: false, code: "PASSWORD_REQUIRED" };

    signupPayload = {
      email,
      password,
      options: { data: { full_name: fullName, role: "job_seeker" } },
    };
  } else {
    const { companyName, workEmail, password } = input as EmployerAuth;
    if (!password) return { success: false, code: "PASSWORD_REQUIRED" };

    signupPayload = {
      email: workEmail,
      password,
      options: {
        data: {
          full_name: companyName,
          company_name: companyName,
          role: "employer",
        },
      },
    };
  }

  const { data, error } = await supabase.auth.signUp(signupPayload);

  if (error) {
    if (error.message.includes("User already registered")) {
      return { success: false, code: "USER_EXISTS" };
    }
    return { success: false, code: "SIGNUP_FAILED" };
  }

  return { success: true, data: data ?? {} };
}

// ─── Login User ────────────────────────────────────────────────
export async function loginUserService(
  role: "job_seeker" | "employer",
  input: JobSeekerAuth | EmployerAuth,
): Promise<ServiceResult<object>> {
  const supabase = await createClient();

  let loginPayload;

  if (role === "job_seeker") {
    const { email, password } = input as JobSeekerAuth;
    if (!password) return { success: false, code: "PASSWORD_REQUIRED" };
    loginPayload = { email, password };
  } else {
    const { workEmail, password } = input as EmployerAuth;
    if (!password) return { success: false, code: "PASSWORD_REQUIRED" };
    loginPayload = { email: workEmail, password };
  }

  const { data, error } = await supabase.auth.signInWithPassword(loginPayload);

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { success: false, code: "INVALID_CREDENTIALS" };
    }
    return { success: false, code: "LOGIN_FAILED" };
  }

  const userRole = data?.user?.user_metadata?.role;
  if (userRole !== role) {
    await supabase.auth.signOut();
    return { success: false, code: "ROLE_MISMATCH" };
  }

  return { success: true, data: data ?? {} };
}

// ─── Forgot Password ───────────────────────────────────────────
export async function forgotPasswordService(
  email: string,
): Promise<ServiceResult> {
  const supabase = await createClient();
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  if (!domain) return { success: false, code: "MISSING_DOMAIN" };

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${domain}/auth/callback?next=/auth/update-password`,
  });

  if (error) return { success: false, code: "RESET_EMAIL_FAILED" };

  return { success: true, data: undefined };
}

// ─── Update Password ───────────────────────────────────────────
export async function updatePasswordService(
  password: string,
): Promise<ServiceResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) return { success: false, code: "UPDATE_PASSWORD_FAILED" };

  await supabase.auth.signOut();
  return { success: true, data: undefined };
}
