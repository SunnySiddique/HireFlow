import {
  CreateJobPost,
  deleteJobPost,
  updateJobPost,
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

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobSlug: string) => deleteJobPost(jobSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployerJobs"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete job:", error);
    },
  });
};
