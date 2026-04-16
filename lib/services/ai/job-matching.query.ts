import { createClient } from "@/lib/supabase/server";

export async function getFilteredJobsForAIQuery() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      job_title,
      job_slug,
      job_description,
      category,
      employment_type,
      experience_level,
      salary_min,
      salary_max,
      currency,
      location,
      remote_option,
      skills_required,
      benefits,
      requirements,
      responsibilities,
      open_positions,
      application_deadline,
      created_at,
      employers:employer_id(company_name)
    `,
    )
    .eq("status", "open")
    .gte(
      "created_at",
      new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    )
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    throw new Error(`Failed to fetch jobs: ${error.message}`);
  }

  return jobs ?? [];
}
