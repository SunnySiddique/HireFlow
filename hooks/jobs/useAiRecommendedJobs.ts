import {
  deleteAllRecommendedJobs,
  deleteRecommendedJob,
  getAllRecommendedJobs,
  saveAllJobs,
} from "@/lib/action/jobs/ai-jobs-recommendations.actions";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { JobRecommendationRow } from "@/types/jobs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllSaveRecommendedJobs = () => {
  return useQuery({
    queryKey: ["save-all-recommended-jobs"],
    queryFn: getAllRecommendedJobs,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useSaveRecommendedJobs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recommendedJobs: JobRecommendationRow[]) =>
      saveAllJobs(recommendedJobs),
    onSuccess: () => {
      toast.success("Jobs saved!");
      invalidateQuery(queryClient, ["save-all-recommended-jobs"]);
    },
    onError: (error: any) => {
      const code = error?.code;

      const messages: Record<string, string> = {
        "23505": "Some of these jobs are already in your saved list.",
        "42501":
          "You don't have permission to save jobs. Please try signing out and back in.",
      };

      toast.error(
        messages[code] ??
          error.message ??
          "Something went wrong while saving jobs.",
      );
    },
  });
};

export const useDeleteAllRecommendedJobs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllRecommendedJobs(),
    onSuccess: () => {
      toast.success("Jobs deleted!");
      invalidateQuery(queryClient, ["save-all-recommended-jobs"]);
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong updating applicant status",
      );
    },
  });
};

export const useDeleteRecommendedJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => deleteRecommendedJob(jobId),
    onSuccess: () => {
      toast.success("Job deleted!");
      invalidateQuery(queryClient, ["save-all-recommended-jobs"]);
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong updating applicant status",
      );
    },
  });
};
