import { uploadJobSeekerImage } from "@/lib/action/media/media.actions";
import {
  saveProfile,
  seekerProfile,
  seekerProfileBySlug,
  seekerProfiles,
} from "@/lib/action/seeker-profile/seeker.actions";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { JobSeekerProfileDB } from "@/types/job-seeker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// save job seeker profile
export const useSaveJobSeekerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profileData: JobSeekerProfileDB) => saveProfile(profileData),
    onSuccess: () => {
      toast.success("Profile saved successfully");
      invalidateQuery(queryClient, ["seeker-profile"]);
      invalidateQuery(queryClient, ["notifications"]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// get job seeker table
export const useSeekerProfile = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["seeker-profile"],
    queryFn: seekerProfile,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

// get job seeker profile by slug
export const useGetJobSeekerProfileBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["seeker-profile", slug],
    queryFn: () => seekerProfileBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};

// media upload
export const useUploadProfileAndResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bucketName,
      file,
      currentFilePath,
    }: {
      bucketName: "job_seeker_profile" | "resumes";
      file: File;
      currentFilePath?: string;
    }) => uploadJobSeekerImage(bucketName, file, currentFilePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seeker-profile"] });
    },
    onError: (error) =>
      toast.error(
        error.message ||
          `Something went wrong. uploading proifleImage or Resume try again`,
      ),
  });
};

// profiles
export const useSeekerProfiles = (search?: string) => {
  return useQuery({
    queryKey: ["seeker-profiles", search ?? ""],
    queryFn: () => seekerProfiles(search),
    staleTime: 1000 * 60 * 5,
  });
};
