import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useCompanyProfile = (slug: string) => {
  return useQuery({
    queryKey: ["company", slug],
    queryFn: async () => {
      const supabase = createClient();
      const { data: company, error: companyError } = await supabase
        .from("employers")
        .select(
          `
      id,
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
      logo_path
      `,
        )
        .eq("slug", slug)
        .single();

      if (companyError || !company) return null;

      const { data: jobs } = await supabase
        .from("jobs")
        .select("*")
        .eq("employer_id", company.id)
        .eq("status", "open")
        .order("created_at", { ascending: false });

      return { company, jobs: jobs || [] };
    },
  });
};
