import {
  applyJob,
  seekerAppliedJobs,
  seekerJobs,
  seekerRecentJobs,
  seekerRecommendedJobs,
  seekerSavedJobs,
  seekerSimilerJobs,
  toggleSaveJob,
} from "@/lib/action/jobs/seeker-jobs.actions";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { normalizeFilters } from "@/lib/utils";
import { InterviewFilters } from "@/types/interview";
import { JobFiltersType, JobWithEmployer } from "@/types/jobs";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useApplyJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobId,
      coverLetter,
    }: {
      jobId: string;
      coverLetter: string;
    }) => applyJob(jobId, coverLetter),
    onSuccess: (data) => {
      if (data === "applied") {
        toast.success("Job applied successfully!");
      } else if (data === "already_applied") {
        toast.error("You have already applied for this job.");
      } else if (data === "job_closed") {
        toast.error("Sorry, this job is closed.");
      }

      if (data === "applied") {
        invalidateQuery(queryClient, ["seeker-application-stats"]);
        invalidateQuery(queryClient, ["get-all-applicants"]);
        invalidateQuery(queryClient, ["employer-applicantion-stats"]);
        invalidateQuery(queryClient, ["chart-applicants"]);
      }
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to apply for job");
    },
  });
};

export const useSavedJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => toggleSaveJob(jobId),
    onSuccess: (data) => {
      invalidateQuery(queryClient, ["get-all-save-jobs"]);
      invalidateQuery(queryClient, ["seeker-application-stats"]);

      if (data === "saved") {
        toast.success("Job saved successfully");
      } else if (data === "unsaved") {
        toast.success("Job removed from saved");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong Saving Job");
    },
  });
};

// get all jobs for jobseeker
export const useSeekerJobs = (filters: JobFiltersType) => {
  const normalized = normalizeFilters(filters);

  return useQuery({
    queryKey: ["get-all-jobs", normalized],
    queryFn: () => seekerJobs(normalized),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};

// get all similar jobs for jobseeker
export const useSeekerSimilerJobs = (jobId: string) => {
  return useQuery({
    queryKey: ["get-similer-jobs", jobId],
    queryFn: () => seekerSimilerJobs(jobId),
    staleTime: 1000 * 60 * 5,

    enabled: !!jobId,
  });
};

// get all applied jobs for current user
export const useSeekerAppliedJobs = (filters?: InterviewFilters) => {
  return useQuery({
    queryKey: [
      "get-all-applicants",
      filters?.search,
      filters?.status,
      filters?.page,
      filters?.limit,
    ],
    queryFn: () => seekerAppliedJobs(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};

// get all save jobs for current user
export const useSeekerSavedJobs = (filters?: InterviewFilters) => {
  return useQuery({
    queryKey: [
      "get-all-save-jobs",
      filters?.status,
      filters?.page,
      filters?.limit,
    ],
    queryFn: () => seekerSavedJobs(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};

// get recent jobs for job seeker
export const useGetRecentJobs = () => {
  return useQuery<JobWithEmployer[]>({
    queryKey: ["recent-jobs"],
    queryFn: seekerRecentJobs,
    staleTime: 1000 * 60 * 5,
  });
};

// recommanded jobs
export const useRecommandedJobs = () => {
  return useQuery({
    queryKey: ["recommended-jobs"],
    queryFn: seekerRecommendedJobs,
    staleTime: 1000 * 60 * 5,
  });
};
