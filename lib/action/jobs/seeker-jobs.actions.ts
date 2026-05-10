"use server";

import {
  applyJobService,
  seekerAppliedJobsService,
  seekerJobsService,
  seekerRecentJobsService,
  seekerRecommendedJobsService,
  seekerSavedJobsService,
  seekerSimilerJobsService,
  toggleSaveJobService,
} from "@/lib/services/jobs/seeker-job.service";
import { InterviewFilters } from "@/types/interview";
import { JobFiltersType } from "@/types/jobs";
import { getServerUser } from "../auth/serverAuth";

export async function applyJob(jobId: string, coverLetter: string) {
  return applyJobService(jobId, coverLetter);
}

// save job for job seeker
export async function toggleSaveJob(jobId: string) {
  return toggleSaveJobService(jobId);
}

// seeker jobs
export async function seekerJobs(filters: JobFiltersType) {
  return seekerJobsService(filters);
}

// seeker similer jobs
export async function seekerSimilerJobs(jobId: string) {
  return seekerSimilerJobsService(jobId);
}

// seeker applied jobs
export async function seekerAppliedJobs(filters?: InterviewFilters) {
  return seekerAppliedJobsService(filters);
}

// seeker saved jobs
export async function seekerSavedJobs(filters?: InterviewFilters) {
  return seekerSavedJobsService(filters);
}

// seeker recent jobs
export async function seekerRecentJobs() {
  return seekerRecentJobsService();
}

// seeker recommended jobs
export async function seekerRecommendedJobs() {
  const { user } = await getServerUser();
  if (!user) throw new Error("UNAUTHROIZED PLS LOGIN");

  return seekerRecommendedJobsService(user.id);
}
