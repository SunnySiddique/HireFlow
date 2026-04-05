"use server";

import { sendInterviewInviteType } from "@/types/interview";
import { redirect } from "next/navigation";
import { toError } from "../errors";
import { sendNotification } from "../notifications.helper";
import { createClient } from "../supabase/server";

export async function sendInterviewInvite(interview: sendInterviewInviteType) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) redirect("/auth/signin");

    const payload = { ...interview, interviewer_id: user.id };
    if (!payload.notes) payload.notes = "";
    if (!payload.feedback) payload.feedback = "";

    const { data, error } = await supabase
      .from("interviews")
      .upsert(payload)
      .select()
      .single();

    const isUpdate = !!interview.id;

    if (error) throw error;

    if (!isUpdate) {
      await sendNotification(
        supabase,
        payload.seeker_id,
        "new_interview_invite",
        "New Interview Invite",
        `You have a new interview invite scheduled on ${new Date(payload.scheduled_at).toLocaleString()}.`,
        `${data.id}`,
      );
    } else if (payload.status === "completed") {
      await sendNotification(
        supabase,
        payload.seeker_id,
        "interview_completed",
        "Interview Completed ✅",
        `Your interview scheduled on ${new Date(payload.scheduled_at).toLocaleString()} has been marked as completed.`,
        `${data.id}`,
      );
    } else {
      await sendNotification(
        supabase,
        payload.seeker_id,
        "interview_updated",
        "Interview Updated 📅",
        `Your interview details have been updated. Please check the latest schedule for ${new Date(payload.scheduled_at).toLocaleString()}.`,
        `${data.id}`,
      );
    }
  } catch (error) {
    console.log("[sendInterviewInvite]", error);
    throw toError(error);
  }
}

// update interview status
export async function updateInterviewStatus(
  interviewId: string,
  status: "accept" | "decline",
  interviewerId: string,
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) redirect("/auth/signin");

    const { error } = await supabase.rpc("update_interview_status", {
      interview_id: interviewId,
      response: status,
    });

    if (status === "accept") {
      await sendNotification(
        supabase,
        interviewerId,
        "interview_accepted",
        "Interview Accepted",
        `Your interview invitation has been accepted.`,
        `${interviewId}`,
      );
    } else {
      await sendNotification(
        supabase,
        interviewerId,
        "interview_declined",
        "Interview Declined",
        `Your interview invitation has been declined.`,
        `${interviewId}`,
      );
    }

    if (error) throw toError(error);
  } catch (error) {
    console.log("[updateInterviewStatus]", error);
    throw toError(error);
  }
}

// delete interview
export async function deleteInterview(interviewId: string, seekerId: string) {
  try {
    console.log(
      "Deleting interview with ID:",
      interviewId,
      "for seekerId:",
      seekerId,
    );
    const supabase = await createClient();
    const { error } = await supabase
      .from("interviews")
      .delete()
      .eq("id", interviewId);

    if (error) throw error;

    await sendNotification(
      supabase,
      seekerId,
      "interview_deleted",
      "Interview Deleted",
      `Your interview invitation has been deleted.`,
      `${interviewId}`,
    );
  } catch (error) {
    console.log("[deleteInterview]", error);
    throw toError(error);
  }
}
