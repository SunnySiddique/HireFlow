"use server";

import { serverAuth } from "../auth/serverAuth";
import { createClient } from "../supabase/server";
import { hasAccess } from "../utils";
import { getSubscription } from "./subscription.actions";

// job-seeker view
export async function trackSeekerProfileView(seekerId: string) {
  const supabase = await createClient();
  const user = await serverAuth();

  const { data: employer } = await supabase
    .from("employers")
    .select("id, slug, company_name, auth_id")
    .eq("auth_id", user.id)
    .maybeSingle();

  if (!employer) return;

  const sub = await getSubscription(user.id);

  const isChampion =
    hasAccess(
      sub?.subscription_status as string,
      sub?.plan_expires_at as string,
    ) && sub?.plan === "champion";

  const { error: viewError } = await supabase.from("profile_views").insert({
    target_id: seekerId,
    target_type: "seeker",
    viewer_id: employer.auth_id,
  });

  if (viewError?.code === "23505") return;

  if (viewError) return;

  if (!isChampion) return;

  await supabase.from("notifications").insert({
    user_id: seekerId,
    type: "profile_view",
    title: "New Profile View!",
    message: `${employer.company_name} viewed your profile`,
    reference_id: employer.slug,
    is_read: false,
  });
}
// employer profile veiw
export async function trackEmployerProfileView(employerId: string) {
  const supabase = await createClient();
  const user = await serverAuth();

  const { data: seeker } = await supabase
    .from("job_seekers")
    .select("id, slug, full_name")
    .eq("auth_id", user.id)
    .maybeSingle();

  if (!seeker) return;

  const sub = await getSubscription(employerId);

  const isElite =
    hasAccess(
      sub?.subscription_status as string,
      sub?.plan_expires_at as string,
    ) && sub?.plan === "elite";

  const { error: viewError } = await supabase.from("profile_views").insert({
    target_id: employerId,
    target_type: "employer",
    viewer_id: seeker.id,
  });

  if (viewError?.code === "23505") return;
  if (viewError) return;

  if (!isElite) return;

  await supabase.from("notifications").insert({
    user_id: employerId,
    type: "profile_view",
    title: "New Profile View!",
    message: `${seeker.full_name} viewed your profile`,
    reference_id: seeker.slug,
    is_read: false,
  });
}

// job view
export async function trackJobView(jobId: string) {
  const supabase = await createClient();
  const user = await serverAuth();

  const { data: seeker } = await supabase
    .from("job_seekers")
    .select("id")
    .eq("auth_id", user.id)
    .maybeSingle();

  if (!seeker) return;

  const { data: job } = await supabase
    .from("jobs")
    .select("employer_id, job_title, job_slug")
    .eq("id", jobId)
    .maybeSingle();

  if (!job) return;
  if (user.id === job.employer_id) return;

  const sub = await getSubscription(job.employer_id);

  const isElite =
    hasAccess(
      sub?.subscription_status as string,
      sub?.plan_expires_at as string,
    ) && sub?.plan === "elite";

  const { error: viewError } = await supabase.from("job_views").insert({
    job_id: jobId,
    viewer_id: seeker.id,
  });

  if (viewError?.code === "23505") return;
  if (viewError) return;

  if (!isElite) return;

  await supabase.from("notifications").insert({
    user_id: job.employer_id,
    type: "job_view",
    title: "New Job View!",
    message: `Someone viewed "${job.job_title}"`,
    reference_id: job.job_slug,
    is_read: false,
  });
}
