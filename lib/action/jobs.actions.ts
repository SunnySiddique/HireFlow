"use server";

import { PLAN_LIMITS } from "@/constants/BillingData";
import { jobFormData, JobFormValues, jobUpdateFormData } from "@/types/jobs";
import { serverAuth } from "../auth/serverAuth";
import {
  sendApplicantsNotification,
  sendJobMatchNotifications,
  sendNotification,
} from "../notifications.helper";
import { createClient } from "../supabase/server";
import { createSlug } from "../utils";

// Get job by slug
export async function getJobPostBySlug(jobSlug: string) {
  try {
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
    if (error) throw new Error("Failed to fetch job");

    return data;
  } catch (error) {
    console.error("Error in getJobPostBySlug:", error);
    throw new Error("Failed to execute getJobPostBySlug");
  }
}

// Create job for employer
export async function createJobPost(jobData: jobFormData) {
  const supabase = await createClient();
  const user = await serverAuth();

  const payload = { ...jobData, employer_id: user.id };

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("subscription_status, plan, job_posts_used, subscription_id")
    .eq("user_id", user.id)
    .single();

  if (!sub) return;

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
export async function updateJobPost(jobSlug: string, jobData: JobFormValues) {
  const supabase = await createClient();

  const user = await serverAuth();

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
export async function updateJobStatus(jobId: string, status: string) {
  const supabase = await createClient();
  console.log("status:", status);
  const { error } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", jobId);

  if (error) throw error;
}

// Delete job for employer
export async function deleteJobPost(jobId: string) {
  const supabase = await createClient();
  const user = await serverAuth();

  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId)
    .eq("employer_id", user.id);
  if (error) throw new Error(error.message);
}

// update applicant status and employer_notes
export async function updateApplicantStatus(
  applicantId: string,
  status: string,
  employer_notes: string,
) {
  const supabase = await createClient();

  const { data: applicant, error } = await supabase
    .from("applicants")
    .update({ status, employer_notes })
    .eq("id", applicantId)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!applicant) throw new Error("Failed to update applicant status");

  await sendApplicantsNotification(supabase, applicant.user_id, status);

  return applicant;
}

// Apply job for job seeker
export async function applyJob(jobId: string, coverLetter: string) {
  const supabase = await createClient();
  const user = await serverAuth();

  const { data, error } = await supabase.rpc("apply_to_job", {
    p_user_id: user.id,
    p_job_id: jobId,
    p_cover_letter: coverLetter,
  });

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to apply job. Try again");

  return data;
}

// save job for job seeker
export async function savedJob(jobId: string) {
  const supabase = await createClient();
  const user = await serverAuth();

  const { data, error } = await supabase.rpc("toggle_saved_job", {
    p_user_id: user.id,
    p_job_id: jobId,
  });

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to save job");

  return data;
}

// update archive field
export async function archiveApplicant(appId: string, isArchived: boolean) {
  const supabase = await createClient();
  await serverAuth();

  const { data, error } = await supabase
    .from("applicants")
    .update({ archived: isArchived })
    .eq("id", appId)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to archive applicant");

  return data;
}
