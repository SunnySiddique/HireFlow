"use server";

import { jobFormData, JobFormValues } from "@/types/jobs";
import {
  activeJobsService,
  chartApplicantsService,
  createJobPostService,
  deleteJobPostService,
  employerJobsService,
  getJobBySlugService,
  recentJobsService,
  updateJobPostService,
  updateJobStatusService,
} from "../../services/jobs/employer-job.service";
import { getServerUser } from "../auth/serverAuth";

export async function employerJobs(filters: { page: number; limit: number }) {
  return employerJobsService(filters);
}

// Get job by slug
export async function getJobBySlug(jobSlug: string) {
  return getJobBySlugService(jobSlug);
}

// Create job for employer
export async function createJobPost(jobData: jobFormData) {
  return createJobPostService(jobData);
}

// Update job for employer
export async function updateJobPost(jobSlug: string, jobData: JobFormValues) {
  return updateJobPostService(jobSlug, jobData);
}

// Update job status for employer
export async function updateJobStatus(jobId: string, status: string) {
  return updateJobStatusService(jobId, status);
}

// Delete job for employer
export async function deleteJobPost(jobId: string) {
  return deleteJobPostService(jobId);
}

// active jobs
export async function activeJobs() {
  const { user } = await getServerUser();
  if (!user) throw new Error("UNAUTHROIZED PLS LOGIN");

  return activeJobsService(user.id);
}

// recent job
export async function recentJobs() {
  const { user } = await getServerUser();
  if (!user) throw new Error("UNAUTHROIZED PLS LOGIN");

  return recentJobsService(user.id);
}

// chart applicants job
export async function chartApplicants() {
  const { user } = await getServerUser();
  if (!user) throw new Error("UNAUTHROIZED PLS LOGIN");

  return chartApplicantsService(user.id);
}
