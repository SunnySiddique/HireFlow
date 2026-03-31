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
    }
  } catch (error) {
    console.log("[sendInterviewInvite]", error);
    throw toError(error);
  }
}
