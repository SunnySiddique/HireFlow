import { createClient } from "@/lib/supabase/server";

export async function companyProfileService(slug: string) {
  const supabase = await createClient();

  const { data: company, error: companyError } = await supabase
    .from("employers")
    .select(
      `
        id,
        auth_id,
        company_name,
        website,
        company_logo_url,
        industry,
        company_size,
        description,
        created_at,
        open_positions_count,
        hiring_status,
        core_values,
        headquarters_location,
        founded_year,
        linkedin_url,
        twitter_url,
        operating_locations,
        logo_path,
        auth_id,
        is_featured
        `,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (!company || companyError) return { company: null, jobs: [] };

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("employer_id", company.auth_id)
    .eq("status", "open")
    .order("created_at", { ascending: false });

  return { company, jobs: jobs || [] };
}
