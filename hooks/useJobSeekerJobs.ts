import { createClient } from "@/lib/supabase/client";
import { JobFiltersType } from "@/types/jobs";
import { useQuery } from "@tanstack/react-query";

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
