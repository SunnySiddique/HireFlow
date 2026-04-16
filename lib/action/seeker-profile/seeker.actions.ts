"use server";

import { getServerUser } from "@/lib/auth/serverAuth";
import { sendProfileCompletionNotifications } from "@/lib/services/notification/notifications.helper";
import { JobSeekerProfileDB } from "@/types/job-seeker";

export async function saveProfile(profileData: JobSeekerProfileDB) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("UNAUTHENTICATED");

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
