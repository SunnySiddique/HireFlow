import { EmployerAuth, JobSeekerAuth } from "@/types/auth";
import { createClient } from "../supabase/server";

// Create user
export async function createUserService(
  role: "job_seeker" | "employer",
  input: JobSeekerAuth | EmployerAuth,
) {
  const supabase = await createClient();
  let signupPayload;

  if (role === "job_seeker") {
    const { fullName, email, password } = input as JobSeekerAuth;

    if (!password) throw new Error("Password is required");

    signupPayload = {
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "job_seeker",
        },
      },
    };
  } else {
    const { companyName, workEmail, password } = input as EmployerAuth;
    if (!password) throw new Error("Password is required");

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
      throw new Error("USER_EXISTS");
    }

    throw new Error(error.message);
  }

  return data;
}

// login user

export async function loginUserService(
  role: "job_seeker" | "employer",
  input: JobSeekerAuth | EmployerAuth,
) {
  const supabase = await createClient();
  let loginPayload;

  if (role === "job_seeker") {
    const { email, password } = input as JobSeekerAuth;

    if (!password) throw new Error("Password is required");

    loginPayload = {
      email,
      password,
    };
  } else {
    const { workEmail, password } = input as EmployerAuth;

    if (!password) throw new Error("Password is required");

    loginPayload = {
      email: workEmail,
      password,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword(loginPayload);

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      throw new Error("INVALID_CREDENTIALS");
    }
    throw new Error(error.message);
  }

  const userRole = data?.user?.user_metadata?.role;

  if (userRole !== role) {
    await supabase.auth.signOut();
    throw new Error("ROLE_MISMATCH");
  }

  return data;
}
