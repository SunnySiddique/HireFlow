"use server";

import { JobSeekerProfileDB } from "@/types/job-seeker";
import { serverAuth } from "../auth/serverAuth";
import { sendProfileCompletionNotifications } from "../notifications.helper";
import { createClient } from "../supabase/server";

export async function saveProfile(profileData: JobSeekerProfileDB) {
  const supabase = await createClient();

  const user = await serverAuth();

  const { data: updatedProfile, error } = await supabase
    .from("job_seekers")
    .update(profileData)
    .eq("auth_id", user.id)
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!updatedProfile) throw new Error("Faild to Save profile");

  await sendProfileCompletionNotifications(
    supabase,
    updatedProfile.auth_id,
    updatedProfile.profile_completion as number,
    updatedProfile.slug as string,
  );
  return updatedProfile;
}
