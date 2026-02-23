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

    if (authError || !user) {
      throw new Error("Not authenticated");
    }

    const { error } = await supabase
      .from("job_seekers")
      .update(profileData)
      .eq("auth_id", user.id);

    if (error) {
      throw new Error(error.message);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
