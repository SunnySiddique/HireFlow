import {
  activeJobs,
  chartApplicants,
  createJobPost,
  deleteJobPost,
  employerJobs,
  recentJobs,
  updateJobPost,
  updateJobStatus,
} from "@/lib/action/jobs/employer-jobs.actions";

import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { jobFormData, jobUpdateFormData } from "@/types/jobs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEmployerJobs = () => {
  return useQuery({
    queryKey: ["employer-jobs"],
    queryFn: employerJobs,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobData: jobFormData) => createJobPost(jobData),
    onSuccess: ({ notified = 0 }) => {
      toast.success(
        notified > 0
          ? `Job posted! ${notified} seekers notified.`
          : "Job posted!",
      );
      invalidateQuery(queryClient, ["employer-jobs"]);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong creating Job");
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      job_slug,
      jobData,
    }: {
      job_slug: string;
      jobData: jobUpdateFormData;
    }) => updateJobPost(job_slug, jobData),
    onSuccess: ({ notified = 0 }) => {
      toast.success(
        notified > 0
          ? `Job updated! ${notified} new seekers notified.`
          : "Job updated!",
      );
      invalidateQuery(queryClient, ["employer-jobs"]);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong updating Job");
    },
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, status }: { jobId: string; status: string }) =>
      updateJobStatus(jobId, status),
    onSuccess: () => {
      invalidateQuery(queryClient, ["employer-jobs"]);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong updating job status");
      invalidateQuery(queryClient, ["employer-jobs"]);
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => deleteJobPost(jobId),
    onSuccess: () => {
      toast.success("Job deleted successfully");
      invalidateQuery(queryClient, ["employer-jobs"]);
      invalidateQuery(queryClient, ["active-jobs"]);
      invalidateQuery(queryClient, ["recent-applicants"]);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong deleting Job");
    },
  });
};

// active jobs
export const useActiveJobs = () => {
  return useQuery({
    queryKey: ["active-jobs"],
    queryFn: activeJobs,
  });
};

// recent applicants for employer
export const useRecentApplicants = () => {
  return useQuery({
    queryKey: ["recent-applicants"],
    queryFn: recentJobs,
  });
};

// chat week applicants
export const useChartApplicants = () => {
  return useQuery({
    queryKey: ["chart-applicants"],
    queryFn: chartApplicants,
  });
};
