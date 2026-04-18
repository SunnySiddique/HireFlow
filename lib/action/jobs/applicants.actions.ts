"use server";

import {
  archiveApplicantService,
  employerApplicantsService,
  updateApplicantStatusService,
} from "@/lib/services/jobs/applicant.service";
import { InterviewFilters } from "@/types/interview";

export async function employerApplicants(filters?: InterviewFilters) {
  return employerApplicantsService(filters);
}

export async function updateApplicantStatus(
  applicantId: string,
  status: string,
  employer_notes: string,
) {
  return updateApplicantStatusService(applicantId, status, employer_notes);
}

// update archive field
export async function archiveApplicant(appId: string, isArchived: boolean) {
  return archiveApplicantService(appId, isArchived);
}
