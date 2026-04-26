import {
  createUser,
  forgotPassword,
  loginUser,
  signinOut,
  updatePassword,
} from "@/lib/action/auth/auth.actions";
import { EmployerAuth, JobSeekerAuth } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// create account
export const useCreateUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (
      payload:
        | { role: "job_seeker"; data: JobSeekerAuth }
        | { role: "employer"; data: EmployerAuth },
    ) => createUser(payload.role, payload.data),

    onSuccess: (_, variables) => {
      toast.success("Account created");

      const rolePath =
        variables.role === "job_seeker" ? "job-seeker" : "employer";

      router.push(`/${rolePath}/dashboard`);
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
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

    onSuccess: (_, variables) => {
      const path =
        variables.role === "job_seeker"
          ? "/job-seeker/dashboard"
          : "/employer/dashboard";

      toast.success("Login successful");
      router.push(path);
    },

    onError: (error) => {
      if (error.message === "INVALID_CREDENTIALS") {
        toast.error("Invalid email or password");
        return;
      }

      if (error.message === "ROLE_MISMATCH") {
        toast.error("This account belongs to a different role");
        return;
      }

      toast.error(error.message || "Login failed");
    },
  });
};

// forgot passwowrd
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),

    onError: (error) => {
      toast.error(error.message || "Something went wrong. Sending email");
    },
  });
};

// update pass
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (password: string) => updatePassword(password),

    onError: (error) => {
      toast.error(error.message || "Something went wrong. Sending email");
    },
  });
};

// signin out
export const useSignOut = () => {
  return useMutation({
    mutationFn: signinOut,
    onSuccess: () => {
      toast.success("Signed out successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};
