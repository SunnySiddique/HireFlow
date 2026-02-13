"use server";

import { JobSeekerProfile } from "@/types/job-seeker";
import { createClient } from "../supabase/server";

export async function saveProfile(profileData: JobSeekerProfile) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) return { success: false, message: authError.message };

    if (!user || user.id !== profileData.auth_id) {
      return {
        success: false,
        message: "Unauthorized profile update",
      };
    }

    const { error } = await supabase
      .from("job_seekers")
      .update(profileData)
      .eq("auth_id", user.id);

    if (error) return { success: false, message: error.message };

    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function getJobSeekerProfile() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("job_seekers")
      .select("*")
      .single();

    if (error) return { success: false, message: error.message };

    return { success: true, profile: data };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

//
export async function getJobSeekerProfileBySlug(slug: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("job_seekers")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return { success: false, message: error.message };

    return { success: true, profile: data };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
