import { getServerUser } from "@/lib/action/auth/serverAuth";
import { startOfMonth, startOfWeek } from "date-fns";

export async function seekerApplicationStatsService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const pastWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const pastMonth = startOfMonth(new Date());

  const [
    { count: weeklyApplications = 0 },
    { count: monthlySavedJobs = 0 },
    { count: weeklyProfileViews = 0 },
    { count: weeklyInterviews = 0 },
  ] = await Promise.all([
    supabase
      .from("applicants")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("applied_at", pastWeekDate.toISOString()),
    supabase
      .from("save_jobs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("saved_at", pastMonth.toISOString()),
    supabase
      .from("profile_views")
      .select("*", { count: "exact", head: true })
      .eq("target_id", user.id)
      .eq("target_type", "seeker")
      .gte("viewed_at", pastWeekDate.toISOString()),
    supabase
      .from("interviews")
      .select("*", { count: "exact", head: true })
      .eq("seeker_id", user.id)
      .gte("scheduled_at", pastWeekDate.toISOString()),
  ]);

  return {
    weeklyApplications,
    monthlySavedJobs,
    weeklyProfileViews,
    weeklyInterviews,
  };
}

// employer
export async function employerApplicationStatsService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const userId = user.id;
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id")
    .eq("employer_id", userId);

  const jobIds = jobs?.map((j) => j.id) ?? [];

  const [
    { count: totalActiveJobs = 0 },
    { count: weeklyApplicants = 0 },
    { count: totalProfileViews = 0 },
    jobViews,
  ] = await Promise.all([
    supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("employer_id", userId)
      .eq("status", "open"),

    supabase
      .from("applicants")
      .select("*", { count: "exact", head: true })
      .eq("employer_id", userId)
      .gte("applied_at", weekStart.toISOString()),

    supabase
      .from("profile_views")
      .select("*", { count: "exact", head: true })
      .eq("target_id", userId)
      .eq("target_type", "employer")
      .gte("viewed_at", weekStart.toISOString()),

    jobIds.length
      ? supabase
          .from("job_views")
          .select("*", { count: "exact", head: true })
          .in("job_id", jobIds)
          .gte("viewed_at", weekStart.toISOString())
      : Promise.resolve({ count: 0 }),
  ]);

  return {
    totalActiveJobs,
    weeklyApplicants,
    totalProfileViews,
    weeklyJobViews: jobViews?.count ?? 0,
  };
}
