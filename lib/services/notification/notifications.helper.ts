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
      reference_id: jobSlug,
      is_read: false,
    })),
  );

  if (notifError) {
    return 0;
  }

  return qualified.length;
}

export async function sendProfileCompletionNotifications(
  supabase: SupabaseClient,
  userId: string,
  profileCompletion: number,
  slug: string,
) {
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    type: "system",
    title: "Profile Updated!",
    message: `Your profile is now ${profileCompletion}% complete.`,
    reference_id: slug,
    is_read: false,
  });

  if (error) {
    console.error("[sendProfileCompletionNotification]", error);
  }
}

export async function sendNotification(
  supabase: SupabaseClient,
  userId: string,
  type: string,
  title: string,
  message: string,
  reference_id: string,
) {
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    type,
    title,
    message,
    reference_id,
    is_read: false,
  });

  if (error) {
    if (error.code === "23505") {
      return;
    }

    console.error("[sendNotification]", error);
  }
}

// Utility function for sending subscription notifications
export async function sendSubscriptionNotification(
  supabase: SupabaseClient,
  userId: string,
  plan: string,
  eventType: string,
  extraData?: { date?: string; amount?: number },
) {
  let title = "";
  let message = "";
  let type = "";

  switch (eventType) {
    case "new":
      title = "Subscription Activated! 🎉";
      message = `Your ${plan} plan is now active. Enjoy your benefits!`;
      type = "new";
      break;
    case "update":
      title = "Plan Updated! 🔄";
      message = `Your plan has been updated to ${plan} successfully.`;
      type = "update";
      break;
    case "renewed":
      title = "Subscription Renewed! ✅";
      message = `Your ${plan} plan has been renewed successfully.`;
      type = "renewed";
      break;
    case "cancelling":
      title = "Subscription Cancellation Scheduled 🔔";
      message = `Your ${plan} plan will be cancelled at the end of your billing period.`;
      type = "cancelling";
      break;
    case "canceled":
      title = "Subscription Cancelled ❌";
      message = `Your ${plan} plan has been cancelled. You can resubscribe anytime.`;
      type = "canceled";
      break;
    case "payment_failed":
      title = "Payment Failed ⚠️";
      message = `Your payment for ${plan} plan failed. Please update your card details.`;
      type = "payment_failed";
      break;
    case "trial_end":
      title = "Trial Ending Soon ⏳";
      message = `Your trial for ${plan} ends on ${extraData?.date}. Don’t forget to subscribe!`;
      type = "trial_end";
      break;
    case "payment_upcoming":
      title = "Upcoming Payment 💳";
      message = `Your next payment of $${extraData?.amount} for ${plan} is due on ${extraData?.date}.`;
      type = "payment_upcoming";
      break;
  }

  if (!userId) return;

  await sendNotification(supabase, userId, type, title, message, type);
}

export async function sendApplicantsNotification(
  supabase: SupabaseClient,
  userId: string,
  eventType: string,
) {
  let title = "";
  let message = "";
  let type = "";

  switch (eventType) {
    case "pending":
      title = "Application Received";
      message =
        "Your application has been received and is pending review. We'll get back to you soon.";
      type = "pending";
      break;
    case "reviewing":
      title = "Application Under Review";
      message =
        "Good news! Your application is currently being reviewed by our hiring team.";
      type = "reviewing";
      break;
    case "shortlisted":
      title = "You've Been Shortlisted! 🎉";
      message =
        "Congratulations! You have been shortlisted for the position. We will contact you shortly regarding the next steps.";
      type = "shortlisted";
      break;
    case "rejected":
      title = "Application Update";
      message =
        "Thank you for your interest. After careful consideration, we have decided to move forward with other candidates. We encourage you to apply for future openings.";
      type = "rejected";
      break;
    case "accepted":
      title = "Application Accepted! 🎊";
      message =
        "Congratulations! Your application has been accepted. Please check your email for further instructions on the onboarding process.";
      type = "accepted";
      break;
  }

  if (!userId) return;

  await sendNotification(supabase, userId, type, title, message, type);
}
