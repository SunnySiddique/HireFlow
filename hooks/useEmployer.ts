import { updateEmployerProfile } from "@/lib/action/employer.actions";
import { uploadEmployerCompanyLogo } from "@/lib/action/media.actions";
import { createClient } from "@/lib/supabase/client";
import { EmployerType } from "@/types/employer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// get employer table from db
export const useEmployerProfile = () => {
  return useQuery({
    queryKey: ["employerProfile"],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employers")
        .select("*")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
  });
};

// get employer table by id
export const useEmployerProfileBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["employerProfileBySlug"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
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

      if (error) throw error;

      return data;
    },
  });
};

// update employer profile
export const useUpdateEmployer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: EmployerType) =>
      updateEmployerProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employerProfileBySlug"] });
      queryClient.invalidateQueries({ queryKey: ["employerProfile"] });
    },
  });
};

// upload logo
export const useUploadCompanyLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, logoPath }: { file: File; logoPath?: string }) =>
      uploadEmployerCompanyLogo(file, logoPath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employerProfileBySlug"] });
    },
    onError: () =>
      toast.error(
        `Something went wrong. uploading proifleImage or Resume try again`,
      ),
  });
};
