import { createUser, loginUser } from "@/lib/auth/auth.actions";
import { EmployerAuth, JobSeekerAuth } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
