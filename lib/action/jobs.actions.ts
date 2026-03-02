"use server";

import { jobFormData, JobFormValues, jobUpdateFormData } from "@/types/jobs";
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
export async function CreateJobPost(jobData: jobFormData) {
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
        error: "You are not authrized to create job post",
      };

    const { error } = await supabase.from("jobs").insert([jobData]);

    if (error) return { success: false, error: error.message };

    return { success: true, message: "Job Created Successfully" };
  } catch (error) {
    console.error("Error in CreateJobPost:", error);
    throw new Error("Failed to execute CreateJobPost");
  }
}

// Update job for employer
export async function updateJobPost(jobSlug: string, jobData: JobFormValues) {
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
        error: "You are not authorized to update job post",
      };

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

    const { error } = await supabase
      .from("jobs")
      .update(payload)
      .eq("job_slug", jobSlug);

    if (error) return { success: false, error: error.message };

    return { success: true, message: "Job Updated Successfully" };
  } catch (error) {
    console.error("Error in updateJobPost:", error);
    throw new Error("Failed to execute updateJobPost");
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
export async function deleteJobPost(jobSlug: string) {
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
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("job_slug", jobSlug);
    if (error) return { success: false, error: error.message };
    return { success: true, message: "Job Deleted Successfully" };
  } catch (error) {
    console.error("Error in deleteJobPost:", error);
    throw new Error("Failed to execute deleteJobPost");
  }
}

// Apply job for job seeker
export async function applyJob(jobId: string, coverLetter: string) {
  try {
    const supabase = await createClient();
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

    if (jobSeekerError || !jobSeeker)
      throw new Error("Job seeker profile not found");

    const { error } = await supabase
      .from("applicants")
      .insert({
        job_id: jobId,
        user_id: jobSeeker.id,
        cover_letter: coverLetter,
      })
      .maybeSingle();

    if (error) throw error;

    return { success: true, message: "Job applied successfully" };
  } catch (error) {
    console.error("Error in applyJob:", error);
    throw new Error("Failed to execute applyJob");
  }
}

export async function savedJob(jobId: string) {
  try {
    const supabase = await createClient();

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

    if (jobSeekerError || !jobSeeker)
      throw new Error("Job seeker profile not found");

    const { error } = await supabase
      .from("save_jobs")
      .insert({ job_id: jobId, user_id: jobSeeker.id })
      .maybeSingle();

    if (error) throw error;

    return { success: true, message: "Job saved successfully" };
  } catch (error) {
    console.error("Error in savedJob:", error);
    throw new Error("Failed to execute savedJob");
  }
}
