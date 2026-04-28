import {
  createUser,
  forgotPassword,
  loginUser,
  signinOut,
  updatePassword,
} from "@/lib/action/auth/auth.actions";
import { EmployerAuth, JobSeekerAuth } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ERROR_MESSAGES: Record<string, string> = {
  PASSWORD_REQUIRED: "Password is required",
  USER_EXISTS: "An account with this email already exists",
  SIGNUP_FAILED: "Failed to create account. Please try again",
  INVALID_CREDENTIALS: "Invalid email or password",
  ROLE_MISMATCH: "This account belongs to a different role",
  LOGIN_FAILED: "Login failed. Please try again",
  RESET_EMAIL_FAILED: "Could not send reset email. Please try again",
  UPDATE_PASSWORD_FAILED: "Could not update password. Please try again",
  SIGNOUT_FAILED: "Sign out failed. Please try again",
  MISSING_DOMAIN: "Configuration error. Please contact support",
};

const getMsg = (code: string) =>
  ERROR_MESSAGES[code] ?? "Something went wrong. Please try again";

// create account
export const useCreateUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (
      payload:
        | { role: "job_seeker"; data: JobSeekerAuth }
        | { role: "employer"; data: EmployerAuth },
    ) => createUser(payload.role, payload.data),

    onSuccess: (result, variables) => {
      if (!result.success) {
        toast.error(getMsg(result.code));
        return;
      }
      toast.success("Account created successfully");

      const rolePath =
        variables.role === "job_seeker" ? "job-seeker" : "employer";
      router.push(`/${rolePath}/dashboard`);
    },
    onError: () => toast.error("Something went wrong. Please try again"),
  });
};

// singin user
export const useLoginUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (
      payload:
        | { role: "job_seeker"; data: JobSeekerAuth }
        | { role: "employer"; data: EmployerAuth },
    ) => loginUser(payload.role, payload.data),

    onSuccess: (result, variables) => {
      if (!result.success) {
        toast.error(getMsg(result.code));
        return;
      }
      const path =
        variables.role === "job_seeker"
          ? "/job-seeker/dashboard"
          : "/employer/dashboard";

      toast.success("Login successful");
      router.push(path);
    },
    onError: () => toast.error("Something went wrong. Please try again"),
  });
};

// forgot passwowrd
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(getMsg(result.code));
        return;
      }
      toast.success("Reset email sent. Please check your inbox");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Sending email");
    },
  });
};

// update pass
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (password: string) => updatePassword(password),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(getMsg(result.code));
        return;
      }
      toast.success("Password updated successfully");
    },
    onError: () => toast.error("Something went wrong. Please try again"),
  });
};

// signin out
export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signinOut,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(getMsg(result.code));
        return;
      }
      queryClient.clear();
      toast.success("Signed out successfully");
      router.push("/auth/signin");
    },

    onError: () => toast.error("Something went wrong. Please try again"),
  });
};
