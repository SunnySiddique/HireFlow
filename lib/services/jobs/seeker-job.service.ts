import { getServerUser } from "@/lib/action/auth/serverAuth";
import { applyPagination } from "@/lib/pagination/pagination";
import { createClient } from "@/lib/supabase/server";
import { InterviewFilters } from "@/types/interview";
import { JobFiltersType } from "@/types/jobs";

export async function applyJobService(jobId: string, coverLetter: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase.rpc("apply_to_job", {
    p_user_id: user.id,
    p_job_id: jobId,
    p_cover_letter: coverLetter,
  });

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to apply job. Try again");

  return data;
}

export async function toggleSaveJobService(jobId: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase.rpc("toggle_saved_job", {
    p_user_id: user.id,
    p_job_id: jobId,
  });

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to save job");

  return data;
}

// all jobs
export async function seekerJobsService(filters: JobFiltersType) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

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
    .eq("status", "open");

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
    query = query.gte("salary_min", filters.salaryMin);
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

  if (filters.featured) {
    query = query.eq("is_featured", true);
  }

  /* ---------------- SORTING ---------------- */

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

  const { from, to, limit, page } = applyPagination(
    filters?.page,
    filters?.limit ?? 5,
  );
  const { data, error, count } = await query.range(from, to);

  if (error) throw error;

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    jobs: data ?? [],
    totalCount,
    currentPage: page,
    totalPages,
  };
}

// similer jobs
export async function seekerSimilerJobsService(jobId: string) {
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("category, employment_type, experience_level")
    .eq("id", jobId)
    .maybeSingle();

  if (!job) return [];

  const { data: similarJobs } = await supabase
    .from("jobs")
    .select(
      `*,
            employer:employer_id (
            id,
            company_name,
            slug,
            company_logo_url,
            website
        )
          `,
    )
    .neq("id", jobId)
    .eq("status", "open")
    .eq("category", job.category ?? "software")
    .eq("employment_type", job.employment_type ?? "full_time")
    .limit(6);

  return similarJobs ?? [];
}

// seeker  applied jobs
export async function seekerAppliedJobsService(filters?: InterviewFilters) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  let query = supabase
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
    .eq("user_id", user.id);

  if (filters?.search && filters.search.trim()) {
    query = query.or(
      `job.job_title.ilike.%${filters.search}%,job.employer.company_name.ilike.%${filters.search}%`,
      { referencedTable: "job" },
    );
  }

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  // pagnination
  const { from, to, limit, page } = applyPagination(
    filters?.page,
    filters?.limit ?? 5,
  );
  const { data, error, count } = await query.range(from, to);

  if (error) throw error;

  const mapped = data.map((appliedJob) => ({
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
  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    jobs: mapped,
    totalPages,
    currentPage: page,
    totalCount,
  };
}

// seeker  saved jobs
export async function seekerSavedJobsService(filters?: InterviewFilters) {
  const { supabase, user } = await getServerUser();
  console.log("fff:", filters);
  if (!user) throw new Error("Unauthorized: Please login to continue");

  let query = supabase
    .from("save_jobs")
    .select(
      `
    id,
    job_id,
    saved_at,
    job:job_id!inner (
      job_title,
      location,
      salary_min,
      salary_max,
      currency,
      status,
      job_slug,
      application_deadline,
      employment_type,
      employer:employer_id!inner  (
        id,
        company_name,
        company_logo_url,
        website
      )
    )
  `,
    )
    .eq("user_id", user.id);
  const search = filters?.search && filters.search.toLowerCase().trim();
  if (search) {
    query = query.or(
      `job.job_title.ilike.%${search}%,job.employer.company_name.ilike.%${search}%`,
      { referencedTable: "job" },
    );
  }

  if (filters?.status && filters.status !== "all") {
    query = query.eq("job.status", filters.status);
  }

  // pagnination
  const { from, to, limit, page } = applyPagination(
    filters?.page,
    filters?.limit ?? 5,
  );
  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  const mapped = data.map((saveJob) => ({
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

  return {
    saved_jobs: mapped,
    totalPages,
    currentPage: page,
    totalCount,
  };
}

// seeker recent jobs
export async function seekerRecentJobsService() {
  const supabase = await createClient();

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
    .order("created_at", { ascending: false })
    .limit(4);

  if (jobError) throw jobError;
  return data;
}

// seeker recommended jobs
export async function seekerRecommendedJobsService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data: jobSeeker, error: jobSeekerError } = await supabase
    .from("job_seekers")
    .select("skills")
    .eq("auth_id", user.id)
    .maybeSingle();

  if (jobSeekerError || !jobSeeker) {
    throw new Error("Job seeker not found");
  }

  const userSkills = jobSeeker.skills ?? [];
  if (userSkills.length === 0) return [];

  const { data: jobs, error } = await supabase
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
        )
      `,
    )
    .eq("status", "open")
    .overlaps("skills_required", userSkills)
    .limit(100)
    .order("created_at", { ascending: false });

  if (error || !jobs) throw new Error("Jobs not found");

  const jobsWithScore = jobs.map((job) => {
    const jobSkills = job.skills_required ?? [];

    const matchScore = jobSkills.filter((skill) =>
      userSkills.includes(skill),
    ).length;

    const matchPercentage =
      jobSkills.length > 0
        ? Math.round((matchScore / jobSkills.length) * 100)
        : 0;

    return {
      ...job,
      matchScore,
      matchPercentage,
    };
  });

  return jobsWithScore
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return b.matchPercentage - a.matchPercentage;
    })
    .slice(0, 20);
}
