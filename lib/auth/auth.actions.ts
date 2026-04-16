"use server";

import { EmployerAuth, JobSeekerAuth } from "@/types/auth";
import {
  createUserService,
  loginUserService,
} from "../services/auth/auth.service";

// Create user
export async function createUser(
  role: "job_seeker" | "employer",
  input: JobSeekerAuth | EmployerAuth,
) {
  return createUserService(role, input);
}

// login user

export async function loginUser(
  role: "job_seeker" | "employer",
  input: JobSeekerAuth | EmployerAuth,
) {
  return loginUserService(role, input);
}
