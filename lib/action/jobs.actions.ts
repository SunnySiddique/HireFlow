"use server";

import { jobFormData, JobFormValues, jobUpdateFormData } from "@/types/jobs";
import { revalidatePath } from "next/cache";
import { toError } from "../errors";
import { sendJobMatchNotifications } from "../notifications.helper";
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
      .single();

    if (error || !data) return null;

    return data;
  } catch (error) {
    console.error("Error in getJobPostBySlug:", error);
    throw new Error("Failed to execute getJobPostBySlug");
  }
}

// Create job for employer
export async function createJobPost(jobData: jobFormData) {
  try {
    const supabase = await createClient();

    const { data: job, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (!job) throw new Error("Failed to create job");

    const jobSkills: string[] = (job.skills_required as string[]) || [];

    const notified = await sendJobMatchNotifications(
      supabase,
      job.job_title,
      jobSkills,
      job.job_slug,
    );

    return { notified };
  } catch (error) {
    console.error("[createJobPost]", error);
    throw toError(error);
  }
}

// Update job for employer
export async function updateJobPost(jobSlug: string, jobData: JobFormValues) {
  try {
    const supabase = await createClient();

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
      .select()
      .single();

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
  } catch (error) {
    console.error("[updateJObPost]", error);
    throw toError(error);
  }
}

// Update job status for employer
export async function updateJobStatus(jobId: string, status: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", jobId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete job for employer
export async function deleteJobPost(jobId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: isAuthError,
    } = await supabase.auth.getUser();
    if (isAuthError) throw isAuthError.message;
    if (!user) return;
    const { data: employerExist, error: isEmployerError } = await supabase
      .from("employers")
      .select("id,auth_id")
      .eq("auth_id", user?.id)
      .single();
    if (isEmployerError) return { success: false, error: "User not found" };
    if (employerExist.auth_id.toString() !== user.id.toString())
      return {
        success: false,
        error: "You are not authorized to delete job post",
      };
    const { error } = await supabase.from("jobs").delete().eq("id", jobId);
    if (error) return { success: false, error: error.message };
    return { success: true, message: "Job Deleted Successfully" };
  } catch (error) {
    console.error("Error in deleteJobPost:", error);
    throw new Error("Failed to execute deleteJobPost");
  }
}

// update applicant status and employer_notes
export async function updateApplicantStatus(
  applicantId: string,
  status: string,
  employer_notes: string,
) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("applicants")
      .update({ status, employer_notes })
      .eq("id", applicantId)
      .select()
      .single();

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error in updateApplicantStatus:", error);
    throw new Error("Failed to execute updateApplicantStatus");
  }
}

// Apply job for job seeker
export async function applyJob(jobId: string, coverLetter: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    const { data: jobSeeker } = await supabase
      .from("job_seekers")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (!jobSeeker) throw new Error("Job seeker profile not found");

    const { data, error } = await supabase.rpc("apply_to_job", {
      p_user_id: jobSeeker.id,
      p_job_id: jobId,
      p_cover_letter: coverLetter,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error in applyJob:", error);
    throw new Error("Failed to execute applyJob");
  }
}

// save job for job seeker
export async function savedJob(jobId: string) {
  try {
    const supabase = await createClient();

    // get auth user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("User not found");

    // Get Job Seeker Profile
    const { data: jobSeeker, error: profileError } = await supabase
      .from("job_seekers")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (profileError || !jobSeeker)
      throw new Error("Job seeker profile not found");

    const { error } = await supabase.rpc("toggle_saved_job", {
      p_user_id: jobSeeker.id,
      p_job_id: jobId,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/jobs");

    return { success: true, message: "Job saved successfully" };
  } catch (error) {
    console.error("Error in savedJob:", error);
    throw new Error("Failed to execute savedJob");
  }
}

// update archive field
export async function archiveApplicant(appId: string, isArchived: boolean) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("applicants")
      .update({ archived: isArchived })
      .eq("id", appId);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Error in archiveApplicant:", error);
    throw new Error("Failed to execute archiveApplicant");
  }
}
