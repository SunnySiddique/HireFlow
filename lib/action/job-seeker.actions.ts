"use server";

import { JobSeekerProfile } from "@/types/job-seeker";
import { toError } from "../errors";
import { sendProfileCompletionNotifications } from "../notifications.helper";
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

    const { data: updatedProfile, error } = await supabase
      .from("job_seekers")
      .update(profileData)
      .eq("auth_id", user.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    await sendProfileCompletionNotifications(
      supabase,
      updatedProfile.auth_id,
      updatedProfile.profile_completion as number,
      updatedProfile.slug as string,
    );
    return { success: true };
  } catch (error) {
    console.error("[saveProfile]", error);
    throw toError(error);
  }
}
