"use server";

import { employerType, JobSeekerType } from "@/types/auth";
import { createClient } from "../supabase/server";

// Create user
export async function createUser(role: "job_seeker" | "employer", input: any) {
  const supabase = await createClient();
  let signupPayload;

  if (role === "job_seeker") {
    const { fullName, email, password }: JobSeekerType = input;

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
    const { companyName, workEmail, password }: employerType = input;

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

export async function loginUser(role: "job_seeker" | "employer", input: any) {
  const supabase = await createClient();
  let loginPayload;

  if (role === "job_seeker") {
    const { email, password }: JobSeekerType = input;

    loginPayload = {
      email,
      password,
    };
  } else {
    const { workEmail, password }: employerType = input;

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

  const userRole = data.user.user_metadata?.role;

  if (userRole !== role) {
    await supabase.auth.signOut();
    throw new Error("ROLE_MISMATCH");
  }

  return data;
}
