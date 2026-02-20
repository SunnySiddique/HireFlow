import { CreateJobPost, updateJobPost } from "@/lib/action/jobs.actions";
import { createClient } from "@/lib/supabase/client";
import { jobFormData, jobUpdateFormData } from "@/types/jobs";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateJob = () => {
  return useMutation({
    mutationFn: (jobData: jobFormData) => CreateJobPost(jobData),
  });
};

export const useUpdateJob = () => {
  return useMutation({
    mutationFn: ({
      job_slug,
      jobData,
    }: {
      job_slug: string;
      jobData: jobUpdateFormData;
    }) => updateJobPost(job_slug, jobData),
  });
};

export const useGetJobBySlug = (jobSlug: string) => {
  return useQuery({
    queryKey: ["getJobBySlug"],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("job_slug", jobSlug)
        .single();

      if (error) throw error;
      return data;
    },
  });
};
