"use server";

import { employerType, JobSeekerType } from "@/types/auth";
import { createClient } from "../supabase/server";

// Create user
export async function createUser(role: "job_seeker" | "employer", input: any) {
  try {
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

    const { error } = await supabase.auth.signUp(signupPayload);

    if (error) {
      if (error.message.includes("User already registered")) {
        return { success: false, message: "User already exists" };
      }
      return { success: false, message: `Signup failed: ${error.message}` };
    }
    return {
      success: true,
      message: "Signup successful.",
    };
  } catch (error: any) {
    console.error("Catch block error:", error);
    return { success: false, message: error.message };
  }
}

// login user

export async function loginUser(role: "job_seeker" | "employer", input: any) {
  try {
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

    const { data, error } =
      await supabase.auth.signInWithPassword(loginPayload);

    if (error) {
      // Common login errors
      if (error.message.includes("Invalid login credentials")) {
        return { success: false, message: "Invalid email or password" };
      }

      return { success: false, message: error.message };
    }

    const userRole = data.user.user_metadata?.role;

    if (userRole !== role) {
      await supabase.auth.signOut();
      return {
        success: false,
        message: `This account is registered as ${userRole === "job_seeker" ? "a job seeker" : "an employer"}. Please use the correct login form.`,
      };
    }

    return {
      success: true,
      message: "Sign in successful",
      data: {
        user: data.user,
        session: data.session,
      },
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
