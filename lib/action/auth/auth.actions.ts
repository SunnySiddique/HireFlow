"use server";

import { EmployerAuth, JobSeekerAuth } from "@/types/auth";
import {
  createUserService,
  forgotPasswordService,
  loginUserService,
  siginOutService,
  updatePasswordService,
} from "../../services/auth/auth.service";

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
export async function signinOut() {
  return siginOutService();
}
