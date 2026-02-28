import {
  CreateJobPost,
  deleteJobPost,
  updateJobPost,
  updateJobStatus,
} from "@/lib/action/jobs.actions";
import { createClient } from "@/lib/supabase/client";
import { jobFormData, jobUpdateFormData } from "@/types/jobs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetEmployerJobs = (empId: string) => {
  return useQuery({
    queryKey: ["getEmployerJobs", empId],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("employer_id", empId);

      if (error) throw error;

      return data;
    },
    enabled: !!empId,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobData: jobFormData) => CreateJobPost(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployerJobs"] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      job_slug,
      jobData,
    }: {
      job_slug: string;
      jobData: jobUpdateFormData;
    }) => updateJobPost(job_slug, jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployerJobs"] });
    },
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, status }: { jobId: string; status: string }) =>
      updateJobStatus(jobId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployerJobs"] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobSlug: string) => deleteJobPost(jobSlug),
    onSuccess: () => {
      toast.success("Job deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getEmployerJobs"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete job:", error);
    },
  });
};

// get applicants
export const useGetAllApplicatns = (empId: string) => {
  return useQuery({
    queryKey: ["allApplicants"],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("applicants")
        .select(
          `
          id,
          status,
          applied_at,
          jobs:!inner(
          id,
          title,
          employer_id
          ),
          job_seekers(
          id,
          full_name,
          email
          )
          `,
        )
        .eq("jobs.employer_id", empId)
        .order("applied_at", { ascending: false });
    },
    enabled: !!empId,
  });
};
