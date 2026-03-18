import { createClient } from "../supabase/client";

// seeker profile view
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
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (!employer) return;

    if (employer.id === seekerId) return;

    const { data: existing } = await supabase
      .from("seeker_profile_views")
      .select("id")
      .eq("seeker_id", seekerId)
      .eq("viewer_id", employer.id)
      .single();

    if (existing) return;

    const { error: viewError } = await supabase
      .from("seeker_profile_views")
      .insert({
        seeker_id: seekerId,
        viewer_id: employer.id,
      });

    if (viewError) throw new Error(viewError.message);

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
      message: "An employer viewed your profile",
      is_read: false,
    });

    // ✅ log notification error
    console.log("[trackSeekerProfileView] notifError:", notifError);
  } catch (error) {
    console.log("[seekerProfileViews]", error);
  }
}

// employer profile view
export async function trackEmployerProfileView(employerId: string) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return;

    const { data: seeker } = await supabase
      .from("job_seekers")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (!seeker) return;

    if (seeker.id === employerId) return;

    const { data: existing } = await supabase
      .from("employer_profile_views")
      .select("id")
      .eq("employer_id", employerId)
      .eq("viewer_id", seeker.id)
      .single();

    if (existing) return;

    const { error: viewError } = await supabase
      .from("employer_profile_views")
      .insert({
        employer_id: employerId,
        viewer_id: seeker.id,
      });

    if (viewError) throw new Error(viewError.message);

    const { data: employer } = await supabase
      .from("employers")
      .select("auth_id")
      .eq("id", employerId)
      .single();

    if (!employer) return;

    await supabase.from("notifications").insert({
      user_id: employer.auth_id,
      type: "profile_view",
      title: "New Profile View!",
      message: "An Job Seeker viewed your profile",
      is_read: false,
    });
  } catch (error) {
    console.log("[trackEmployerProfileView]", error);
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
      .single();

    if (!seeker) return;

    const { data: existing } = await supabase
      .from("job_views")
      .select("id")
      .eq("job_id", jobId)
      .eq("viewer_id", seeker.id)
      .single();

    if (existing) return;

    const { error: viewError } = await supabase.from("job_views").insert({
      job_id: jobId,
      viewer_id: seeker.id,
    });

    if (viewError) throw new Error(viewError.message);

    const { data: job } = await supabase
      .from("jobs")
      .select("employer_id, job_title")
      .eq("id", jobId)
      .single();

    if (!job) return;

    const { data: employer } = await supabase
      .from("employers")
      .select("auth_id")
      .eq("id", job.employer_id)
      .single();

    if (!employer) return;

    await supabase.from("notifications").insert({
      user_id: employer.auth_id,
      type: "job_view",
      title: "New Job View!",
      message: `A job seeker viewed your "${job.job_title}" posting`,
      is_read: false,
    });
  } catch (error) {
    console.error("[trackJobView]", error);
  }
}
