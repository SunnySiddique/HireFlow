import {
  applyJob,
  CreateJobPost,
  deleteJobPost,
  savedJob,
  updateJobPost,
  updateJobStatus,
} from "@/lib/action/jobs.actions";
import { createClient } from "@/lib/supabase/client";
import { JobFiltersType, jobFormData, jobUpdateFormData } from "@/types/jobs";
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

// get all jobs for jobseeker
export const useGetAllJobsForJobSeeker = (filters: JobFiltersType) => {
  return useQuery({
    queryKey: ["getAllJobs", JSON.stringify(filters)],
    queryFn: async () => {
      const supabase = createClient();

      let query = supabase
        .from("jobs")
        .select(
          `*,
           employer:employer_id (
            id,
            company_name,
            company_logo_url,
            website
          )
        `,
          { count: "exact" },
        )
        .neq("status", "closed");

      if (filters.category) {
        query = query.eq("category", filters.category);
      }

      if (filters.employmentType) {
        query = query.eq("employment_type", filters.employmentType);
      }

      if (filters.experienceLevel) {
        query = query.eq("experience_level", filters.experienceLevel);
      }
      if (filters.salaryMin !== undefined) {
        query = query.gte("salary_max", filters.salaryMin);
      }
      if (filters.salaryMax !== undefined) {
        query = query.lte("salary_max", filters.salaryMax);
      }

      if (filters.search) {
        query = query.ilike("job_title", `%${filters.search}%`);
      }

      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }

      if (filters.sort) {
        switch (filters.sort) {
          case "recent":
            query = query.order("created_at", { ascending: false });
            break;
          case "salary-high":
            query = query.order("salary_max", { ascending: false });
            break;

          case "salary-low":
            query = query.order("salary_max", { ascending: true });
            break;
          default:
            query = query.order("created_at", { ascending: false });
        }
      }

      const page = filters.page ?? 1;
      const limit = filters.limit ?? 10;

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      const totalCount = count ?? 0;
      const totalPages = Math.ceil(totalCount / limit);

      return {
        jobs: data ?? [],
        totalCount,
        currentPage: page,
        totalPages,
      };
    },
    placeholderData: (prevData) => prevData,
  });
};

// get all similar jobs for jobseeker
export const useGetSimilarJobs = (jobId: string) => {
  return useQuery({
    queryKey: ["getSimilerJobs", jobId],
    queryFn: async () => {
      const supabase = createClient();

      const { data: job } = await supabase
        .from("jobs")
        .select("category, employment_type, experience_level")
        .eq("id", jobId)
        .single();

      if (!job) return [];

      const { data: similarJobs } = await supabase
        .from("jobs")
        .select(
          `*,
            employer:employer_id (
            id,
            company_name,
            company_logo_url,
            website
        )
          `,
        )
        .neq("id", jobId)
        .eq("status", "open")
        .eq("category", job.category)
        .eq("employment_type", job.employment_type)
        .limit(6);

      return similarJobs ?? [];
    },
    enabled: !!jobId,
  });
};

// apply job as a job seeker
export const useApplyJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobId,
      coverLetter,
    }: {
      jobId: string;
      coverLetter: string;
    }) => applyJob(jobId, coverLetter),
    onSuccess: () => {
      toast.success("Job Applied Successfully");
      queryClient.invalidateQueries({ queryKey: ["getSingleApplicant"] });
    },
  });
};

// get single applicants
export const useGetSingleApplicant = (jobId: string) => {
  return useQuery({
    queryKey: ["getSingleApplicant", jobId],
    queryFn: async () => {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not found");

      const { data: jobSeeker, error: jobSeekerError } = await supabase
        .from("job_seekers")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (jobSeekerError || !jobSeeker) throw new Error("Job seeker not found");

      const { data, error } = await supabase
        .from("applicants")
        .select("*")
        .eq("user_id", jobSeeker.id)
        .eq("job_id", jobId)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
    enabled: !!jobId,
  });
};

// get single save job
export const useGetSingleSaveJob = (jobId: string) => {
  return useQuery({
    queryKey: ["getSingleSaveJob", jobId],
    queryFn: async () => {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not found");

      const { data: jobSeeker, error: jobSeekerError } = await supabase
        .from("job_seekers")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (jobSeekerError || !jobSeeker) throw new Error("Job seeker not found");

      const { data, error } = await supabase
        .from("save_jobs")
        .select("*")
        .eq("user_id", jobSeeker.id)
        .eq("job_id", jobId)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
    enabled: !!jobId,
  });
};

// saved job as a job seeker
export const useSavedJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => savedJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSingleSaveJob"] });
      toast.success("Job Saved Successfully");
    },
  });
};
