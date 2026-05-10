"use server";

import { EmployerAuth, JobSeekerAuth } from "@/types/auth";
import { redirect } from "next/navigation";
import {
  createUserService,
  forgotPasswordService,
  loginUserService,
  updatePasswordService,
} from "../../services/auth/auth.service";
import { getServerUser } from "./serverAuth";

// create user
export async function createUser(
  role: "job_seeker" | "employer",
  input: JobSeekerAuth | EmployerAuth,
) {
  return createUserService(role, input);
}

// signin user
export async function loginUser(
  role: "job_seeker" | "employer",
  input: JobSeekerAuth | EmployerAuth,
) {
  return loginUserService(role, input);
}

// forgot password
export async function forgotPassword(email: string) {
  return forgotPasswordService(email);
}

// update password
export async function updatePassword(password: string) {
  return updatePasswordService(password);
}

// update password
export async function signOut() {
  const { supabase } = await getServerUser();
  await supabase.auth.signOut();
  redirect("/auth/signin");
}
