"use server";

import { jobFormData, JobFormValues, jobUpdateFormData } from "@/types/jobs";
import { createClient } from "../supabase/server";
import { createSlug } from "../utils";

export async function getJobPostBySlug(jobSlug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("job_slug", jobSlug)
      .single();

    if (error || !data) return null;

    return data;
  } catch (error) {
    console.error("Error in getJobPostBySlug:", error);
    throw new Error("Failed to execute getJobPostBySlug");
  }
}

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
      job_type: jobData.jobType,
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
