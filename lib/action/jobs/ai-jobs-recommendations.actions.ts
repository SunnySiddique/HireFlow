"use server";

import { JobRecommendationRow } from "@/types/jobs";
import { getServerUser } from "../auth/serverAuth";

export const getAllRecommendedJobs = async () => {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("UNAUTHORIZED");

  const { data, error } = await supabase
    .from("job_recommendations")
    .select(
      `
      id,
      score,
      why,
      created_at,
      job:jobs(
        id,
        job_title,
        employment_type,
        location,
        salary_min,
        salary_max,
        currency,
        job_slug,
        employer:employer_id(
          company_name
        )
      )
      `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Error while fetching recommended jobs");

  return data ?? [];
};

export const saveAllJobs = async (recommendedJobs: JobRecommendationRow[]) => {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("UNAUTHORIZED");

  const rows = recommendedJobs.map((job) => ({
    user_id: user.id,
    job_id: job.job_id,
    score: job.fit_score,
    why: job.why_this_match,
  }));

  // One single insert for ALL jobs
  const { error } = await supabase.from("job_recommendations").insert(rows);

  if (error) {
    if (error.code === "23505") {
      throw new Error("You've already saved one or more of these jobs.");
    }
    throw error;
  }
};

export const deleteAllRecommendedJobs = async () => {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("UNAUTHORIZED");

  const { error } = await supabase
    .from("job_recommendations")
    .delete()
    .eq("user_id", user.id);

  if (error) throw error;
};

export const deleteRecommendedJob = async (jobId: string) => {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("UNAUTHORIZED");

  const { error } = await supabase
    .from("job_recommendations")
    .delete()
    .eq("user_id", user.id)
    .eq("job_id", jobId);

  if (error) throw error;
};
