import {
  APPLICANT_TEMPLATES,
  SUBSCRIPTION_TEMPLATES,
} from "@/constants/notificationData";
import { NotificationPayload } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

const MATCH_THRESHOLD = 0.4;
const RELEVANCE_THRESHOLD = 0.3;

// send notificaition
export async function sendNotification(
  supabase: SupabaseClient,
  userId: string,
  type: string,
  title: string,
  message: string,
  referenceId: string,
) {
  await insertNotification(
    supabase,
    userId,
    { type, title, message },
    referenceId,
  );
}

export async function insertNotification(
  supabase: SupabaseClient,
  userId: string,
  payload: NotificationPayload,
  referenceId: string,
) {
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    type: payload.type,
    title: payload.title,
    message: payload.message,
    reference_id: referenceId,
    is_read: false,
  });

  if (error) {
    if (error.code === "23505") return;
    console.error("[insertNotification]", error);
  }
}

export async function sendJobMatchNotifications(
  supabase: SupabaseClient,
  jobTitle: string,
  jobSkills: string[],
  jobSlug: string,
): Promise<number> {
  if (!jobSkills.length) return 0;

  const { data: seekers, error: seekersError } = await supabase
    .from("job_seekers")
    .select("id, skills, auth_id")
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

  await Promise.all(
    qualified.map((seeker) =>
      insertNotification(
        supabase,
        seeker.auth_id,
        {
          type: "job_match",
          title: "New Job Match!",
          message: `A new ${jobTitle} position matches your profile`,
        },
        jobSlug,
      ),
    ),
  );

  return qualified.length;
}

export async function sendProfileCompletionNotification(
  supabase: SupabaseClient,
  userId: string,
  profileCompletion: number,
  slug: string,
) {
  await insertNotification(
    supabase,
    userId,
    {
      type: "system",
      title: "Profile Updated!",
      message: `Your profile is now ${profileCompletion}% complete.`,
    },
    slug,
  );
}

// Utility function for sending subscription notifications
export async function sendSubscriptionNotification(
  supabase: SupabaseClient,
  userId: string,
  plan: string,
  eventType: string,
  referenceId: string,
  extraData?: { date?: string; amount?: number },
) {
  if (!userId) return;

  const template = SUBSCRIPTION_TEMPLATES[eventType];
  if (!template) return;

  const message = template.message
    .replace("{plan}", plan)
    .replace("{date}", extraData?.date ?? "")
    .replace("{amount}", String(extraData?.amount ?? ""));

  await insertNotification(
    supabase,
    userId,
    { ...template, message },
    referenceId,
  );
}

export async function sendApplicantsNotification(
  supabase: SupabaseClient,
  userId: string,
  eventType: string,
  referenceId: string,
) {
  if (!userId) return;

  const template = APPLICANT_TEMPLATES[eventType];
  if (!template) return;

  await insertNotification(supabase, userId, template, referenceId);
}
