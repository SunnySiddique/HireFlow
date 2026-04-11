import { saveProfile } from "@/lib/action/job-seeker.actions";
import { uploadJobSeekerImage } from "@/lib/action/media.actions";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { createClient } from "@/lib/supabase/client";
import { JobSeekerProfile } from "@/types/job-seeker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

// save job seeker profile
export const useSaveJobSeekerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profileData: JobSeekerProfile) => saveProfile(profileData),
    onSuccess: () => {
      toast.success("Profile saved successfully");
      invalidateQuery(queryClient, ["jobSeekerProfile"]);
      invalidateQuery(queryClient, ["notifications"]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// get job seeker table
export const useGetJobSeekerProfile = () => {
  return useQuery({
    queryKey: ["jobSeekerProfile"],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_seekers")
        .select("*")
        .eq("auth_id", user?.id)
        .maybeSingle();
      if (error) throw error;

      return data;
    },
  });
};

// get job seeker profile by slug
export const useGetJobSeekerProfileBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["jobSeekerProfile", slug],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("job_seekers")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;

      return data;
    },
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
    onError: (error) =>
      toast.error(
        error.message ||
          `Something went wrong. uploading proifleImage or Resume try again`,
      ),
  });
};

// profiles
export const useSeekerProfiles = () => {
  return useQuery({
    queryKey: ["seekerProfiles"],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) redirect("/auth/signin");

      const { data, error } = await supabase
        .from("job_seekers")
        .select("*")
        .neq("auth_id", user.id);

      if (error) throw error;

      return data;
    },
  });
};
