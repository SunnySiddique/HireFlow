import {
  applyJob,
  CreateJobPost,
  deleteJobPost,
  savedJob,
  updateJobPost,
  updateJobStatus,
} from "@/lib/action/jobs.actions";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { createClient } from "@/lib/supabase/client";
import {
  JobFiltersType,
  jobFormData,
  jobUpdateFormData,
  JobWithEmployer,
} from "@/types/jobs";
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

    onError: (error: Error | { message?: string; error?: string }) => {
      console.error("[DEBUG] useCreateJob onError:", error);
      // Error is already logged, component should handle displaying it
    },
    onSuccess: (data) => {
      console.log("[DEBUG] useCreateJob onSuccess:", data);
      invalidateQuery(queryClient, ["getEmployerJobs"]);
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
      invalidateQuery(queryClient, ["getEmployerJobs"]);
    },
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, status }: { jobId: string; status: string }) =>
      updateJobStatus(jobId, status),
    onSuccess: () => {
      invalidateQuery(queryClient, ["getEmployerJobs"]);
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

// // get applicants
// export const useGetAllApplicatns = (empId: string) => {
//   return useQuery({
//     queryKey: ["allApplicants"],
//     queryFn: async () => {
//       const supabase = createClient();

//       const { data, error } = await supabase
//         .from("applicants")
//         .select(
//           `
//           id,
//           status,
//           applied_at,
//           jobs:!inner(
//           id,
//           title,
//           employer_id
//           ),
//           job_seekers(
//           id,
//           full_name,
//           email
//           )
//           `,
//         )
//         .eq("jobs.employer_id", empId)
//         .order("applied_at", { ascending: false });
//     },
//     enabled: !!empId,
//   });
// };

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

      /* ---------------- SORTING ---------------- */
      query = query.order("created_at", { ascending: false });

      if (filters.sort !== "all") {
        if (filters.sort === "recent") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

          query = query
            .gte("created_at", sevenDaysAgo.toISOString())
            .order("created_at", { ascending: false });
        } else if (filters.sort === "salary-high") {
          query = query.order("salary_max", {
            ascending: false,
            nullsFirst: false,
          });
        } else if (filters.sort === "salary-low") {
          query = query.order("salary_max", {
            ascending: true,
            nullsFirst: false,
          });
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
    onSuccess: (data) => {
      if (data === "applied") {
        toast.success("Job applied successfully!");
      } else if (data === "already_applied") {
        toast.error("You have already applied for this job.");
      } else if (data === "job_closed") {
        toast.error("Sorry, this job is closed.");
      }

      if (data === "applied") {
        invalidateQuery(queryClient, ["applicationStats"]);
        invalidateQuery(queryClient, ["getAllApplicants"]);
      }
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to apply for job");
    },
  });
};

// get all applied jobs for current user
export const useGetCurrentUserAppliedJobs = () => {
  return useQuery({
    queryKey: ["getAllApplicants"],
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
        .select(
          `
    id,
    job_id,
    status,
    cover_letter,
    employer_notes,
    applied_at,
    job:job_id (
      job_title,
      location,
      salary_min,
      salary_max,
      status,
      job_slug,
      employment_type,
      skills_required,
      created_at,
      currency,
      employer:employer_id (
        id,
        company_name,
        company_logo_url,
        website
      )
    )
  `,
        )
        .eq("user_id", jobSeeker.id);

      if (error) throw error;

      return data.map((appliedJob: any) => ({
        id: appliedJob.id,
        job_id: appliedJob.job_id,
        application_status: appliedJob.status,
        employer_notes: appliedJob.employer_notes,
        cover_letter: appliedJob.cover_letter,
        applied_at: appliedJob.applied_at,

        job_title: appliedJob.job?.job_title,
        location: appliedJob.job?.location ?? null,
        salary_min: appliedJob.job?.salary_min ?? null,
        salary_max: appliedJob.job?.salary_max ?? null,
        job_status: appliedJob.job?.status ?? null,
        job_slug: appliedJob.job?.job_slug ?? null,
        skills_required: appliedJob.job?.skills_required ?? null,
        employment_type: appliedJob.job?.employment_type ?? null,
        created_at: appliedJob.job?.created_at ?? null,
        currency: appliedJob.job?.currency ?? null,
        employer: appliedJob.job?.employer ?? null,
      }));
    },
  });
};

// get all save jobs for current user
export const useGetCurrentUserSaveJobs = () => {
  return useQuery({
    queryKey: ["getAllSaveJobs"],
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
        .select(
          `
    id,
    job_id,
    saved_at,
    job:job_id (
      job_title,
      location,
      salary_min,
      salary_max,
      currency,
      status,
      job_slug,
      application_deadline,
      employment_type,
      employer:employer_id (
        id,
        company_name,
        company_logo_url,
        website
      )
    )
  `,
        )
        .eq("user_id", jobSeeker.id);

      if (error) throw error;

      return data.map((saveJob: any) => ({
        id: saveJob.id,
        job_id: saveJob.job_id,
        saved_at: saveJob.saved_at,
        job_title: saveJob.job?.job_title,
        location: saveJob.job?.location ?? null,
        salary_min: saveJob.job?.salary_min ?? null,
        salary_max: saveJob.job?.salary_max ?? null,
        currency: saveJob.job?.currency ?? null,
        status: saveJob.job?.status ?? null,
        job_slug: saveJob.job?.job_slug ?? null,
        application_deadline: saveJob.job?.application_deadline ?? null,
        employment_type: saveJob.job?.employment_type ?? null,
        employer: saveJob.job?.employer ?? null,
      }));
    },
  });
};

// saved job as a job seeker
export const useSavedJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => savedJob(jobId),
    onSuccess: () => {
      invalidateQuery(queryClient, ["getAllSaveJobs"]);
      invalidateQuery(queryClient, ["applicationStats"]);
      toast.success("Job Saved Successfully");
    },
  });
};

// get recent jobs for job seeker
export const useGetRecentJobs = () => {
  return useQuery<JobWithEmployer[]>({
    queryKey: ["recentJobs"],
    queryFn: async () => {
      const supabase = createClient();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data, error: jobError } = await supabase
        .from("jobs")
        .select(
          `
  id,
  job_title,
  location,
  salary_min,
  salary_max,
  currency,
  employment_type,
  job_slug,
  created_at,
  status,
  employer:employer_id (
    company_name,
    company_logo_url
  )
`,
        )
        .eq("status", "open")
        .gte("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: false })
        .limit(4);

      if (jobError) throw jobError;
      return data;
    },
  });
};

// recommanded jobs
export const useRecommandedJobs = () => {
  return useQuery<JobWithEmployer[]>({
    queryKey: ["recomandedJobs"],
    queryFn: async (): Promise<JobWithEmployer[]> => {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not found");

      const { data: jobSeeker, error: jobSeekerError } = await supabase
        .from("job_seekers")
        .select("*")
        .eq("auth_id", user.id)
        .single();

      if (jobSeekerError || !jobSeeker) throw new Error("Job seeker not found");

      const userSkills: string[] = jobSeeker.skills || [];
      if (userSkills.length === 0) return [];

      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select(
          `
                id,
                job_title,
                location,
                salary_min,
                salary_max,
                currency,
                employment_type,
                job_slug,
                created_at,
                skills_required,
           employer:employer_id (
             id,
             company_name,
             company_logo_url,
             website
           )`,
        )
        .neq("status", "closed")
        .overlaps("skills_required", userSkills);

      if (jobsError || !jobs) throw new Error("Jobs not found");

      const jobsWithScore = jobs.map((job) => {
        const jobSkills: string[] = job.skills_required || [];
        const matchScore = jobSkills.filter((skill) =>
          userSkills.includes(skill),
        ).length;

        return {
          ...job,
          matchScore,
        };
      });

      jobsWithScore.sort((a, b) => b.matchScore - a.matchScore);

      return jobsWithScore;
    },
  });
};
