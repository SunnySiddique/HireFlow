import { PLAN_LIMITS } from "@/constants/billingData";
import { getServerUser } from "@/lib/action/auth/serverAuth";
import { applyPagination } from "@/lib/pagination/pagination";
import {
  sendJobMatchNotifications,
  sendNotification,
} from "@/lib/services/notification/notifications.helper";
import { createClient } from "@/lib/supabase/server";
import { createSlug } from "@/lib/utils";
import { jobFormData, JobFormValues, jobUpdateFormData } from "@/types/jobs";

export async function employerJobsService(filters: {
  page: number;
  limit: number;
}) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const query = supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .eq("employer_id", user.id);

  const { from, to, limit, page } = applyPagination(
    filters?.page,
    filters?.limit ?? 5,
  );
  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    empJobs: data ?? [],
    totalCount,
    currentPage: page,
    totalPages,
  };
}

// Get job by slug
export async function getJobBySlugService(jobSlug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `*,
      employer:employer_id(
      id,
      slug,
      company_name,
      company_logo_url,
      website,
      description
        )
        `,
    )
    .eq("job_slug", jobSlug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to fetch job");

  return data;
}

// Create job for employer
export async function createJobPostService(jobData: jobFormData) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const payload = { ...jobData, employer_id: user.id };

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("subscription_status, plan, job_posts_used, subscription_id")
    .eq("user_id", user.id)
    .single();

  if (!sub)
    throw new Error("No subscription found. Please subscribe to a plan.");

  if (sub.subscription_status !== "active") {
    throw new Error(
      "Your subscription is not active. Please update your payment.",
    );
  }

  const limit = PLAN_LIMITS[sub.plan as keyof typeof PLAN_LIMITS];

  if (sub.plan !== "elite") {
    if ((sub?.job_posts_used as number) >= limit) {
      throw new Error("Job post limit reached. Please upgrade your plan.");
    }
  }

  const { data: job, error } = await supabase
    .from("jobs")
    .insert([payload])
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!job) throw new Error("Failed to create job");

  await supabase.rpc("increment_job_posts_used", {
    p_user_id: user.id,
  });

  if (sub.plan !== "elite") {
    const used = (sub?.job_posts_used as number) + 1;
    const left = limit - used;

    if (left === 0) {
      await sendNotification(
        supabase,
        user.id,
        "job_post_limit",
        "Job Post Limit Reached! 🚫",
        `You have used all ${limit} job posts on your ${sub.plan} plan. Upgrade your plan to post more jobs.`,
        "/employer/billing",
      );
    } else if (left <= 2) {
      await sendNotification(
        supabase,
        job.employer_id,
        "job_post_limit",
        "Running Low on Job Posts! ⚠️",
        `You have ${left} job post${left === 1 ? "" : "s"} remaining on your ${sub.plan} plan. Upgrade to post more jobs.`,
        "/employer/billing",
      );
    }
  }

  const jobSkills: string[] = (job.skills_required as string[]) || [];

  const notified = await sendJobMatchNotifications(
    supabase,
    job.job_title,
    jobSkills,
    job.job_slug,
  );

  return { notified };
}

// Update job for employer
export async function updateJobPostService(
  jobSlug: string,
  jobData: JobFormValues,
) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const updatedSlug = createSlug(jobData.jobTitle);

  const payload: jobUpdateFormData = {
    job_slug: updatedSlug,
    job_title: jobData.jobTitle,
    category: jobData.category,
    employment_type: jobData.employmentType,
    experience_level: jobData.experienceLevel,
    open_positions: jobData.numberOfPositions,
    location: jobData.primaryLocation,
    remote_option: jobData.workArrangement,
    salary_min: jobData.minimumSalary,
    salary_max: jobData.maximumSalary,
    currency: jobData.currency,
    benefits: jobData.benefits ?? [],
    job_description: jobData.jobDescription,
    requirements: jobData.requirements.length > 0 ? jobData.requirements : [],
    responsibilities:
      jobData.responsibilities.length > 0 ? jobData.responsibilities : [],
    application_deadline: jobData.applicationDeadline || null,
    status: jobData.status,
    skills_required: jobData.skills ?? [],
    is_featured: jobData.isFeatured,
  };

  const { data: updatedJob, error } = await supabase
    .from("jobs")
    .update(payload)
    .eq("job_slug", jobSlug)
    .eq("employer_id", user.id)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!updatedJob) throw new Error("Falied to update job");

  const jobSkills: string[] = (updatedJob.skills_required as string[]) || [];

  const notified = await sendJobMatchNotifications(
    supabase,
    updatedJob.job_title,
    jobSkills,
    updatedJob.job_slug,
  );

  return { notified };
}

// Update job status for employer
export async function updateJobStatusService(jobId: string, status: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { error } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", jobId);

  if (error) throw error;
}

// Delete job for employer
export async function deleteJobPostService(jobId: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId)
    .eq("employer_id", user.id);
  if (error) throw new Error(error.message);
}

// active jobs
export async function activeJobsService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
        id,
        job_title,
        status,
        created_at,
        job_slug,
        employment_type,
        remote_option,
        applicants(count)  
        `,
    )
    .eq("employer_id", user.id)
    .eq("status", "open")
    .limit(5);

  if (error) throw error;
  return data;
}

// recent jobs
export async function recentJobsService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase
    .from("applicants")
    .select(
      `
          id,
          applied_at,
          seeker:user_id(full_name, profile_url),
          job:job_id(job_title)
          `,
    )
    .eq("employer_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return data;
}

// chart applicants jobs
export async function chartApplicantsService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  // 3. Get all applicants for this employer
  const { data, error } = await supabase
    .from("applicants")
    .select("applied_at")
    .eq("employer_id", user.id);

  if (error) throw new Error(error.message);

  // 4. Create weekday counters
  const counts = [0, 0, 0, 0, 0, 0, 0];

  data?.forEach((app) => {
    const day = new Date(app.applied_at as string).getDay();
    counts[day]++;
  });

  // 5. Convert to chart structure
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = labels.map((day, i) => ({
    day,
    applicants: counts[i],
  }));

  return chartData;
}
