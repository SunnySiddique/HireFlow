import { getServerUser } from "@/lib/action/auth/serverAuth";
import { EmployerDB } from "@/types/employer";

// update employer profile
export async function updateEmployerProfileService(profileData: EmployerDB) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase
    .from("employers")
    .update(profileData)
    .eq("auth_id", user.id)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!data) throw new Error("UPDATE_FAILED");

  return data;
}

// fetch employer profile
export async function employerProfileService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase
    .from("employers")
    .select("*")
    .eq("auth_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

// fetch employer by slug
export async function employerProfileBySlugService(slug: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase
    .from("employers")
    .select(`*`)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;

  return data;
}

// employer profiles
export async function employerProfilesService(search?: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  let query = supabase
    .from("employers")
    .select(
      "id, auth_id, company_name, company_logo_url, industry, core_values, description, work_email, headquarters_location, company_size, open_positions_count, hiring_status, slug, is_featured",
    )
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (search?.trim()) {
    query = query.ilike("company_name", `%${search.trim()}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return {
    featured: data.filter((p) => p.is_featured),
    regular: data.filter((p) => !p.is_featured),
  };
}
