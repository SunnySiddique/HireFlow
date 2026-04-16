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
export async function seekerSavedJobs() {
  return seekerSavedJobsService();
}

// seeker recent jobs
export async function seekerRecentJobs() {
  return seekerRecentJobsService();
}

// seeker recommended jobs
export async function seekerRecommendedJobs() {
  return seekerRecommendedJobsService();
}
