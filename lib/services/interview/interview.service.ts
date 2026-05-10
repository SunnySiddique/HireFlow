import { getServerUser } from "@/lib/action/auth/serverAuth";
import { applyPagination } from "@/lib/pagination/pagination";
import { createClient } from "@/lib/supabase/server";
import { serviceClient } from "@/lib/supabase/service";
import {
  Interview,
  InterviewFilters,
  InterviewInvite,
} from "@/types/interview";
import { sendNotification } from "../notification/notifications.helper";

// send interview link to the seeker
export async function sendInterviewInviteService(interview: InterviewInvite) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

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

// update interview
export async function updateInterviewStatusService(
  interviewId: string,
  status: "accept" | "decline",
  interviewerId: string,
) {
  const supabase = await createClient();

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
export async function deleteInterviewService(
  interviewId: string,
  seekerId: string,
) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

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

// quries
export async function interviewsService(
  filters?: InterviewFilters,
  role: "employer" | "seeker" = "employer",
) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const queryId = role === "employer" ? "interviewer_id" : "seeker_id";
  const selectedField =
    role === "employer"
      ? `seeker:seeker_id(auth_id, profile_url)`
      : `employer:interviewer_id(company_logo_url, company_name)`;
  let query = supabase
    .from("interviews")
    .select(
      `
            id,
            seeker_id,
            application_id,
            interviewer_id,
            status,
            interview_type,
            scheduled_at,
            duration_minutes,
            meeting_link,
            interviewer_name,
            interviewer_title,
            message,
            notes,
            feedback,
            candidate_name,
          ${selectedField},
          applicant:application_id(
         job:job_id(
          job_title
        )
      )
            `,
      { count: "exact" },
    )
    .eq(queryId, user.id);

  if (filters?.status && filters?.status !== "all") {
    query = query.eq("status", filters?.status);
  }

  // pagnination
  const { from, to, limit, page } = applyPagination(
    filters?.page,
    filters?.limit ?? 5,
  );
  const { data, error, count } = await query.range(from, to);

  if (error) throw error;

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data: data as unknown as Interview[],
    totalPages,
    currentPage: page,
    totalCount,
  };
}

// interview by id
export async function interivewService(interviewId: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase
    .from("interviews")
    .select(
      `*,
            employer:interviewer_id(company_logo_url, company_name),
          applicant:application_id(
         job:job_id(
          job_title
        )
      )
      `,
    )
    .eq("id", interviewId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// upcoming interview
export async function upcomingInterviewsService(
  isView: boolean,
  userId: string,
) {
  const supabase = await serviceClient;

  const now = new Date().toISOString();

  let query = supabase
    .from("interviews")
    .select(
      `
          *,
          employer:interviewer_id(
            company_logo_url,
            company_name
          ),
          applicant:application_id(
            job:job_id(job_title)
          )
        `,
    )
    .eq("seeker_id", userId)
    .eq("status", "upcoming")
    .gte("scheduled_at", now)
    .order("scheduled_at", { ascending: true });

  if (isView) {
    query = query.limit(4);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

// send interview before interview start
export async function notifyBeforeInterviewService(interviewId: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data, error } = await supabase
    .from("interviews")
    .select("id, scheduled_at, status")
    .eq("id", interviewId)
    .maybeSingle();

  if (!data || error || !data.scheduled_at) throw error;
  if (data.status === "completed") return;

  const { data: existing } = await supabase
    .from("notifications")
    .select("id")
    .eq("user_id", user.id)
    .eq("reference_id", data.id)
    .eq("type", "interview_reminder")
    .maybeSingle();
  if (existing) return;

  await sendNotification(
    supabase,
    user.id,
    "interview_reminder",
    "Upcoming Interview Reminder ⏰",
    `Your interview is starting in 5 minutes at ${new Date(data.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. Get ready!`,
    data.id,
  );
}
