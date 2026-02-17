import { updateEmployerProfile } from "@/lib/action/employer.actions";
import { createClient } from "@/lib/supabase/client";
import { EmployerType } from "@/types/employer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// get employer table from db
export const useEmployerProfile = () => {
  return useQuery({
    queryKey: ["employerProfile"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("employers")
        .select("*")
        .single();

      if (error) throw error;

      return data;
    },
  });
};

// get employer table by id
export const useEmployerProfileById = (slug: string) => {
  return useQuery({
    queryKey: ["employerProfileById"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("employers")
        .select("*")
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
      queryClient.invalidateQueries({ queryKey: ["employerProfile"] });
    },
  });
};
