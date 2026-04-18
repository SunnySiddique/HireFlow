import {
  employerProfile,
  employerProfileBySlug,
  employerProfiles,
  updateEmployerProfile,
} from "@/lib/action/employer-profile/employer-profile.actions";
import { uploadEmployerCompanyLogo } from "@/lib/action/media/media.actions";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { EmployerDB } from "@/types/employer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// get employer table from db
export const useEmployerProfile = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["employer-profile"],
    queryFn: employerProfile,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};

// get employer table by id
export const useEmployerProfileBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["employer-profile-by-slug"],
    queryFn: () => employerProfileBySlug(slug),
    staleTime: 1000 * 60 * 5,
    enabled: !!slug,
  });
};

// update employer profile
export const useUpdateEmployer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: EmployerDB) => updateEmployerProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer-profile-by-slug"] });
      queryClient.invalidateQueries({ queryKey: ["employer-profile"] });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
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
      invalidateQuery(queryClient, ["employer-profile-by-slug"]);
    },
    onError: (error) =>
      toast.error(
        error.message ||
          `Something went wrong. uploading proifleImage or Resume try again`,
      ),
  });
};

// profiles
export const useEmployerProfiles = (search?: string) => {
  return useQuery({
    queryKey: ["employer-profiles", search ?? ""],
    queryFn: () => employerProfiles(search),
    staleTime: 1000 * 60 * 5,
  });
};
