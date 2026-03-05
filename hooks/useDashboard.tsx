import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useGetApplicationStats = () =>
  useQuery({
    queryKey: ["applicationStats"],
    queryFn: async () => {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not found");
      }

      const { data: jobSeeker, error: jobSeekerError } = await supabase
        .from("job_seekers")
        .select("id")
        .eq("auth_id", user?.id)
        .single();

      if (jobSeekerError || !jobSeeker) {
        throw new Error("Job seeker not found");
      }

      const pastWeek = new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000,
      ).toISOString();

      const pastMonth = new Date(
        Date.now() - 30 * 24 * 60 * 60 * 1000,
      ).toISOString();

      const [
        { count: total = 0 },
        { count: thisWeek = 0 },
        { count: thisMonth = 0 },
      ] = await Promise.all([
        supabase
          .from("applicants")
          .select("*", { count: "exact", head: true })
          .eq("user_id", jobSeeker?.id),
        supabase
          .from("applicants")
          .select("*", { count: "exact", head: true })
          .eq("user_id", jobSeeker?.id)
          .gte("applied_at", pastWeek),
        supabase
          .from("save_jobs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", jobSeeker?.id)
          .gte("saved_at", pastMonth),
      ]);

      return {
        totalApplications: total,
        thisWeekApplications: thisWeek,
        thisMonthSavedJobs: thisMonth,
      };
    },
  });
