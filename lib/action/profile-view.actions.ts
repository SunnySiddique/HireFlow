import { toError } from "../errors";
import { createClient } from "../supabase/client";

// job-seeker view
export async function trackSeekerProfileView(seekerId: string) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return;

    const { data: employer } = await supabase
      .from("employers")
      .select("id, slug, company_name")
      .eq("auth_id", user.id)
      .single();

    if (!employer) return;

    // record view
    const { error: viewError } = await supabase.from("profile_views").insert({
      target_id: seekerId,
      target_type: "seeker",
      viewer_id: employer.id,
    });

    if (viewError?.code === "23505") return;
    if (viewError) throw new Error(viewError.message);

    // notify seeker
    const { data: seeker } = await supabase
      .from("job_seekers")
      .select("auth_id")
      .eq("id", seekerId)
      .single();

    if (!seeker) return;

    const { error: notifError } = await supabase.from("notifications").insert({
      user_id: seeker.auth_id,
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
    if (authError || !user) return;

    // current user must be a seeker
    const { data: seeker } = await supabase
      .from("job_seekers")
      .select("id, slug, full_name")
      .eq("auth_id", user.id)
      .single();

    if (!seeker) return;

    // check already viewed

    // record view
    const { error: viewError } = await supabase.from("profile_views").insert({
      target_id: employerId,
      target_type: "employer",
      viewer_id: seeker.id,
    });

    if (viewError?.code === "23505") return;
    if (viewError) throw new Error(viewError.message);

    // notify employer
    const { data: employer } = await supabase
      .from("employers")
      .select("auth_id")
      .eq("id", employerId)
      .single();

    if (!employer) return;

    const { error: notifError } = await supabase.from("notifications").insert({
      user_id: employer.auth_id,
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
    if (authError || !user) return;

    // current user must be a seeker
    const { data: seeker } = await supabase
      .from("job_seekers")
      .select("id")
      .eq("auth_id", user.id)
      .maybeSingle();

    if (!seeker) return;

    const { error: viewError } = await supabase.from("job_views").insert({
      job_id: jobId,
      viewer_id: seeker.id,
    });

    if (viewError?.code === "23505") return;
    if (viewError) throw new Error(viewError.message);

    const { data: job } = await supabase
      .from("jobs")
      .select("employer_id, job_title, job_slug")
      .eq("id", jobId)
      .maybeSingle();

    if (!job) return;

    const { data: employer } = await supabase
      .from("employers")
      .select("auth_id")
      .eq("id", job.employer_id)
      .maybeSingle();

    if (!employer) return;

    await supabase.from("notifications").insert({
      user_id: employer.auth_id,
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
