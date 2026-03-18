import { SupabaseClient } from "@supabase/supabase-js";

const MATCH_THRESHOLD = 0.4;
const RELEVANCE_THRESHOLD = 0.3;

export async function sendJobMatchNotifications(
  supabase: SupabaseClient,
  jobTitle: string,
  jobSkills: string[],
  jobSlug: string,
): Promise<number> {
  if (!jobSkills.length) return 0;

  const { data: seekers, error: seekersError } = await supabase
    .from("job_seekers")
    .select("skills, auth_id")
    .overlaps("skills", jobSkills);

  if (seekersError || !seekers?.length) return 0;

  const qualified = seekers.filter((seeker) => {
    const seekerSkills: string[] = (seeker.skills as string[]) || [];

    const normalizedJobSkills = jobSkills.map((s) => s.toLowerCase());
    const normalizedSeekerSkills = seekerSkills.map((s) => s.toLowerCase());

    const matchedSkills = normalizedJobSkills.filter((skill) =>
      normalizedSeekerSkills.includes(skill),
    );
    return (
      matchedSkills.length / jobSkills.length >= MATCH_THRESHOLD &&
      matchedSkills.length / seekerSkills.length >= RELEVANCE_THRESHOLD
    );
  });

  if (!qualified.length) return 0;

  const qualifiedIds = qualified.map((s) => s.id);

  // 3. Find who already got notified for this specific job
  const { data: existingNotifs } = await supabase
    .from("notifications")
    .select("user_id")
    .eq("type", "job_match")
    .eq("job_slug", jobSlug)
    .in("user_id", qualifiedIds);

  const alreadyNotified = new Set((existingNotifs ?? []).map((n) => n.user_id));

  const newRecipients = qualified.filter(
    (seeker) => !alreadyNotified.has(seeker.id),
  );

  if (!newRecipients.length) return 0;

  const { error: notifError } = await supabase.from("notifications").insert(
    newRecipients.map((seeker) => ({
      user_id: seeker.auth_id,
      type: "job_match",
      title: "New Job Match!",
      message: `A new ${jobTitle} position matches your profile`,
      is_read: false,
    })),
  );

  if (notifError) {
    console.error("[sendJobMatchNotifications]", notifError);
    return 0;
  }

  return qualified.length;
}

export async function sendProfileCompletionNotifications(
  supabase: SupabaseClient,
  userId: string,
  profileCompletion: number,
) {
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    type: "system",
    title: "Profile Updated!",
    message: `Your profile is now ${profileCompletion}% complete.`,
    is_read: false,
  });

  if (error) {
    console.error("[sendProfileCompletionNotification]", error);
  }
}
