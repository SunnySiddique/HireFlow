"use server";

import { sendInterviewInviteType } from "@/types/interview";
import { serverAuth } from "../auth/serverAuth";
import { sendNotification } from "../notifications.helper";
import { createClient } from "../supabase/server";

export async function sendInterviewInvite(interview: sendInterviewInviteType) {
  const supabase = await createClient();
  const user = await serverAuth();

  const payload = {
    ...interview,
    interviewer_id: user.id,
    notes: interview.notes ?? "",
    feedback: interview.feedback ?? "",
  };

  const isUpdate = Boolean(interview.id);

  const { data, error } = await supabase
    .from("interviews")
    .upsert(payload)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to send interview invite");

  const scheduledTime = new Date(payload.scheduled_at).toLocaleString();

  if (!isUpdate) {
    await sendNotification(
      supabase,
      payload.seeker_id,
      "new_interview_invite",
      "New Interview Invite",
      `You have a new interview invite scheduled on ${scheduledTime}.`,
      `${data.id}`,
    );
  } else if (payload.status === "completed") {
    await sendNotification(
      supabase,
      payload.seeker_id,
      "interview_completed",
      "Interview Completed ✅",
      `Your interview on ${scheduledTime} was completed.`,
      `${data.id}`,
    );
  } else {
    await sendNotification(
      supabase,
      payload.seeker_id,
      "interview_updated",
      "Interview Updated 📅",
      `Interview updated. New schedule: ${scheduledTime}.`,
      `${data.id}`,
    );
  }

  return data;
}

// update interview status
export async function updateInterviewStatus(
  interviewId: string,
  status: "accept" | "decline",
  interviewerId: string,
) {
  const supabase = await createClient();
  await serverAuth();

  const { error } = await supabase.rpc("update_interview_status", {
    interview_id: interviewId,
    response: status,
  });

  if (error) throw new Error(error.message);

  const isAccepted = status === "accept";

  await sendNotification(
    supabase,
    interviewerId,
    isAccepted ? "interview_accepted" : "interview_declined",
    isAccepted ? "Interview Accepted" : "Interview Declined",
    isAccepted
      ? "Your interview invitation has been accepted."
      : "Your interview invitation has been declined.",
    `${interviewId}`,
  );
}

// delete interview
export async function deleteInterview(interviewId: string, seekerId: string) {
  const supabase = await createClient();
  await serverAuth();

  const { error } = await supabase
    .from("interviews")
    .delete()
    .eq("id", interviewId);

  if (error) throw new Error(error.message);

  await sendNotification(
    supabase,
    seekerId,
    "interview_deleted",
    "Interview Deleted",
    "Your interview invitation has been deleted.",
    `${interviewId}`,
  );
}
