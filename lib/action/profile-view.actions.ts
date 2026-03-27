import { redirect } from "next/navigation";
import { toError } from "../errors";
import { createClient } from "../supabase/client";
import { hasAccess } from "../utils";

// job-seeker view
export async function trackSeekerProfileView(seekerId: string) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) redirect("/auth/signin");

    const { data: employer } = await supabase
      .from("employers")
      .select("id, slug, company_name,auth_id")
      .eq("auth_id", user.id)
      .single();

    if (!employer) return;

    const { data: seekerSub } = await supabase
      .from("subscriptions")
      .select("subscription_status, plan_expires_at, plan")
      .eq("user_id", user.id)
      .maybeSingle();

    const isSeekerChampion =
      hasAccess(
        seekerSub?.subscription_status as string,
        seekerSub?.plan_expires_at as string,
      ) && seekerSub?.plan === "champion";

    // record view
    const { error: viewError } = await supabase.from("profile_views").insert({
      target_id: seekerId,
      target_type: "seeker",
      viewer_id: employer.auth_id,
    });

    if (viewError?.code === "23505") return;
    if (viewError) throw new Error(viewError.message);
    if (!isSeekerChampion) return;

    const { error: notifError } = await supabase.from("notifications").insert({
      user_id: seekerId,
      type: "profile_view",
      title: "New Profile View!",
      message: `${employer.company_name} viewed your profile`,
      reference_id: employer.slug,
      is_read: false,
    });

    if (notifError) throw new Error(notifError.message);
  } catch (error) {
    console.error("[trackSeekerProfileView]", error);
    throw toError(error);
  }
}

// employer profile veiw
export async function trackEmployerProfileView(employerId: string) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) redirect("/auth/signin");

    // current user must be a seeker
    const { data: seeker } = await supabase
      .from("job_seekers")
      .select("id, slug, full_name")
      .eq("auth_id", user.id)
      .single();

    if (!seeker) return;

    const { data: employerSub } = await supabase
      .from("subscriptions")
      .select("subscription_status, plan_expires_at, plan")
      .eq("user_id", employerId)
      .maybeSingle();

    const isEmployerElite =
      hasAccess(
        employerSub?.subscription_status as string,
        employerSub?.plan_expires_at as string,
      ) && employerSub?.plan === "elite";
    console.log("employerAuthId:", employerId);
    console.log("employerSub:", employerSub);
    console.log("isEmployerElite:", isEmployerElite);

    // record view
    const { error: viewError } = await supabase.from("profile_views").insert({
      target_id: employerId,
      target_type: "employer",
      viewer_id: seeker.id,
    });

    if (viewError?.code === "23505") return;
    if (viewError) throw new Error(viewError.message);
    if (!isEmployerElite) return;

    const { error: notifError } = await supabase.from("notifications").insert({
      user_id: employerId,
      type: "profile_view",
      title: "New Profile View!",
      message: `${seeker.full_name} viewed your profile`,
      reference_id: seeker.slug,
      is_read: false,
    });

    if (notifError) throw new Error(notifError.message);
  } catch (error) {
    console.error("[trackEmployerProfileView]", error);
    throw toError(error);
  }
}

// job view
export async function trackJobView(jobId: string) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) redirect("/auth/signin");

    // current user must be a seeker
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

    const { data: emproyerSub } = await supabase
      .from("subscriptions")
      .select("subscription_status, plan_expires_at, plan")
      .eq("user_id", job.employer_id)
      .maybeSingle();

    const isEmployerChampion =
      hasAccess(
        emproyerSub?.subscription_status as string,
        emproyerSub?.plan_expires_at as string,
      ) && emproyerSub?.plan === "elite";

    const { error: viewError } = await supabase.from("job_views").insert({
      job_id: jobId,
      viewer_id: seeker.id,
    });

    if (viewError?.code === "23505") return;
    if (viewError) throw new Error(viewError.message);
    if (!isEmployerChampion) return;

    await supabase.from("notifications").insert({
      user_id: job.employer_id,
      type: "job_view",
      title: "New Job View!",
      message: `A job seeker viewed your "${job.job_title}" posting`,
      reference_id: job.job_slug,
      is_read: false,
    });
  } catch (error) {
    console.error("[trackJobView]", error);
  }
}
