import { createClient } from "@/lib/supabase/client";
import { pastWeek } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

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
        throw new Error("User not found");
      }

      const { data: jobSeeker, error: jobSeekerError } = await supabase
        .from("job_seekers")
        .select("id")
        .eq("auth_id", user?.id)
        .maybeSingle();

      if (jobSeekerError || !jobSeeker) {
        throw new Error("Job seeker not found");
      }

      const pastWeek = new Date();
      pastWeek.setDate(pastWeek.getDate() - 7);

      const pastMonth = new Date();
      pastMonth.setDate(pastMonth.getDate() - 30);

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
          .gte("applied_at", pastWeek.toISOString()),
        supabase
          .from("save_jobs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", jobSeeker?.id)
          .gte("saved_at", pastMonth.toISOString()),
      ]);

      return {
        totalApplications: total,
        thisWeekApplications: thisWeek,
        thisMonthSavedJobs: thisMonth,
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
        throw new Error("User not found");
      }

      const { data: empProfile, error: empError } = await supabase
        .from("employers")
        .select("id")
        .eq("auth_id", user?.id)
        .maybeSingle();

      if (empError || !empProfile) {
        throw new Error("Employer profile not found");
      }

      const [{ count: total = 0 }, { count: thisWeekTotalApplicants = 0 }] =
        await Promise.all([
          supabase
            .from("jobs")
            .select("*", { count: "exact", head: true })
            .eq("employer_id", empProfile.id)
            .eq("status", "open")
            .gte("created_at", pastWeek()),
          supabase
            .from("applicants")
            .select("*", { count: "exact", head: true })
            .eq("employer_id", empProfile.id)
            .gte("applied_at", pastWeek()),
        ]);

      return {
        totalActiveJobs: total,
        thisWeekApplicants: thisWeekTotalApplicants,
      };
    },
  });
};
