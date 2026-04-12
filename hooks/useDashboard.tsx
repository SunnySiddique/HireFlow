import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { startOfMonth, startOfWeek } from "date-fns";
import { redirect } from "next/navigation";

export const useGetJobSeekerApplicationStats = () =>
  useQuery({
    queryKey: ["applicationStats"],
    queryFn: async () => {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        redirect("/auth/signin");
      }

      const pastWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });
      const pastMonth = startOfMonth(new Date());

      const [
        { count: thisWeek = 0 },
        { count: thisMonth = 0 },
        { count: totalProfileViews = 0 },
        { count: thisWeekUpcomingInterview = 0 },
      ] = await Promise.all([
        supabase
          .from("applicants")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user?.id)
          .gte("applied_at", pastWeekDate.toISOString()),
        supabase
          .from("save_jobs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user?.id)
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
        thisWeekApplications: thisWeek,
        thisMonthSavedJobs: thisMonth,
        thisWeekProfileviews: totalProfileViews,
        thisWeekUpcomingInterview,
      };
    },
  });

export const useGetEmployerApplicationStats = () => {
  return useQuery({
    queryKey: ["empApplicantionStats"],
    queryFn: async () => {
      const supabase = await createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        redirect("/auth/signin");
      }

      const pastWeekDate = startOfWeek(new Date(), { weekStartsOn: 1 });

      const { data: jobs } = await supabase
        .from("jobs")
        .select("id")
        .eq("employer_id", user.id);
      const jobIds = jobs?.map((j) => j.id) ?? [];

      const [
        { count: total = 0 },
        { count: thisWeekTotalApplicants = 0 },
        { count: totalProfileViews = 0 },
        { count: thisWeekJobViews = 0 },
      ] = await Promise.all([
        supabase
          .from("jobs")
          .select("*", { count: "exact", head: true })
          .eq("employer_id", user.id)
          .eq("status", "open")
          .gte("created_at", pastWeekDate.toISOString()),
        supabase
          .from("applicants")
          .select("*", { count: "exact", head: true })
          .eq("employer_id", user.id)
          .gte("applied_at", pastWeekDate.toISOString()),
        supabase
          .from("profile_views")
          .select("*", { count: "exact", head: true })
          .eq("target_id", user.id)
          .eq("target_type", "employer")
          .gte("viewed_at", pastWeekDate.toISOString()),
        jobIds.length > 0
          ? supabase
              .from("job_views")
              .select("*", { count: "exact", head: true })
              .in("job_id", jobIds)
              .gte("viewed_at", pastWeekDate.toISOString())
          : Promise.resolve({ count: 0 }),
      ]);

      return {
        totalActiveJobs: total,
        thisWeekApplicants: thisWeekTotalApplicants,
        totalProfileViews,
        thisWeekJobViews,
      };
    },
  });
};
