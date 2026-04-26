import { getServerUser } from "@/lib/action/auth/serverAuth";
import { JobSeekerProfileDB } from "@/types/job-seeker";
import { sendProfileCompletionNotification } from "../notification/notifications.helper";

export async function saveSeekerProfileService(
  profileData: JobSeekerProfileDB,
) {
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

  await sendProfileCompletionNotification(
    supabase,
    updatedProfile.auth_id,
    updatedProfile.profile_completion as number,
    updatedProfile.slug as string,
  );
  return updatedProfile;
}

export async function seekerProfileService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase
    .from("job_seekers")
    .select("*")
    .eq("auth_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

// seeker profile by slug
export async function seekerProfileBySlugService(slug: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase
    .from("job_seekers")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;

  return data;
}

// seeker profiles
export async function getSeekerProfilesService(search?: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  let query = supabase.from("job_seekers").select("*").neq("auth_id", user.id);

  if (search?.trim()) {
    query = query.ilike("full_name", `%${search.trim()}%`);
  }

  const { data, error } = await query;
  if (error) throw error;

  return {
    featured: data.filter((p) => p.is_featured),
    regular: data.filter((p) => !p.is_featured),
  };
}
