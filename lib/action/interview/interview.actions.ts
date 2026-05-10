"use server";

import {
  deleteInterviewService,
  interivewService,
  interviewsService,
  notifyBeforeInterviewService,
  sendInterviewInviteService,
  upcomingInterviewsService,
  updateInterviewStatusService,
} from "@/lib/services/interview/interview.service";
import { InterviewFilters, InterviewInvite } from "@/types/interview";
import { getServerUser } from "../auth/serverAuth";

export async function sendInterviewInvite(interview: InterviewInvite) {
  return sendInterviewInviteService(interview);
}

// update interview status
export async function updateInterviewStatus(
  interviewId: string,
  status: "accept" | "decline",
  interviewerId: string,
) {
  return updateInterviewStatusService(interviewId, status, interviewerId);
}

// delete interview
export async function deleteInterview(interviewId: string, seekerId: string) {
  return deleteInterviewService(interviewId, seekerId);
}

// quries
export async function interviews(
  filters?: InterviewFilters,
  role: "employer" | "seeker" = "employer",
) {
  return interviewsService(filters, role);
}

// interview by id
export async function interivew(interviewId: string) {
  return interivewService(interviewId);
}

// upcoming interview
export async function upcomingInterviews(isView: boolean) {
  const { user } = await getServerUser();
  if (!user) throw new Error("UNAUTHROIZED PLS LOGIN");

  return upcomingInterviewsService(isView, user.id);
}

// send interview before interview start
export async function notifyBeforeInterview(interviewId: string) {
  return notifyBeforeInterviewService(interviewId);
}
