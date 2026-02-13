import {
  getJobSeekerProfile,
  getJobSeekerProfileBySlug,
  saveProfile,
} from "@/lib/action/job-seeker.actions";
import { uploadJobSeekerImage } from "@/lib/action/media.actions";
import { JobSeekerProfile } from "@/types/job-seeker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// save job seeker profile
export const useSaveJobSeekerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profileData: JobSeekerProfile) => saveProfile(profileData),
    onSuccess: () => {
      toast.success("Profile saved successfully");
      queryClient.invalidateQueries({ queryKey: ["jobSeekerProfile"] });
    },
    onError: () => toast.error("Something went wrong. Please try again"),
  });
};

// get job seeker table
export const useGetJobSeekerProfile = () => {
  return useQuery({
    queryKey: ["jobSeekerProfile"],
    queryFn: getJobSeekerProfile,
  });
};

// get job seeker profile by slug
export const useGetJobSeekerProfileBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["jobSeekerProfile", slug],
    queryFn: () => getJobSeekerProfileBySlug(slug),
    enabled: !!slug,
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
      queryClient.invalidateQueries({ queryKey: ["jobSeekerProfile"] });
    },
    onError: () =>
      toast.error(
        `Something went wrong. uploading proifleImage or Resume try again`,
      ),
  });
};
