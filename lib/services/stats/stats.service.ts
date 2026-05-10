import { serviceClient } from "@/lib/supabase/service";
import { startOfMonth, startOfWeek } from "date-fns";

export async function seekerApplicationStatsService(userId: string) {
  const supabase = await serviceClient;

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
      .eq("user_id", userId)
      .gte("applied_at", pastWeekDate.toISOString()),
    supabase
      .from("save_jobs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("saved_at", pastMonth.toISOString()),
    supabase
      .from("profile_views")
      .select("*", { count: "exact", head: true })
      .eq("target_id", userId)
      .eq("target_type", "seeker")
      .gte("viewed_at", pastWeekDate.toISOString()),
    supabase
      .from("interviews")
      .select("*", { count: "exact", head: true })
      .eq("seeker_id", userId)
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
export async function employerApplicationStatsService(userId: string) {
  const supabase = await serviceClient;

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString();

  const [
    { count: totalActiveJobs },
    { count: weeklyApplicants },
    { count: totalProfileViews },
    { count: weeklyJobViews },
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
      .gte("applied_at", weekStart),

    supabase
      .from("profile_views")
      .select("*", { count: "exact", head: true })
      .eq("target_id", userId)
      .eq("target_type", "employer")
      .gte("viewed_at", weekStart),

    supabase
      .from("job_views")
      .select("*", { count: "exact", head: true })
      .eq("employer_id", userId)
      .gte("viewed_at", weekStart),
  ]);

  return {
    totalActiveJobs: totalActiveJobs ?? 0,
    weeklyApplicants: weeklyApplicants ?? 0,
    totalProfileViews: totalProfileViews ?? 0,
    weeklyJobViews: weeklyJobViews ?? 0,
  };
}
