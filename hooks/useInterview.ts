import {
  deleteInterview,
  sendInterviewInvite,
  updateInterviewStatus,
} from "@/lib/action/interview.actions";
import { sendNotification } from "@/lib/notifications.helper";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { createClient } from "@/lib/supabase/client";
import { InterviewFilters, sendInterviewInviteType } from "@/types/interview";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

// employer
export const useSendInterviewInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (interview: sendInterviewInviteType) =>
      sendInterviewInvite(interview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: (error) => {
      toast.error(
        error.message ? error.message : "Failed to send interview invite.",
      );
      console.log("[useSendInterviewInvite]", error);
    },
  });
};

export const useInterviews = (
  filters?: InterviewFilters,
  role: "employer" | "seeker" = "employer",
) => {
  return useQuery({
    queryKey: ["interviews", filters?.search, filters?.status, filters?.page],
    queryFn: async () => {
      const supabase = await createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) redirect("/auth/signin");

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
        ${selectedField}
          `,
          { count: "exact" },
        )
        .eq(queryId, user.id);

      if (filters?.search) {
        query = query.ilike("interviewer_name", `%${filters.search}%`);
      }

      if (filters?.status && filters?.status !== "all") {
        query = query.eq("status", filters?.status);
      }

      if (filters?.type && filters?.type !== "all") {
        query = query.eq("interview_type", filters?.type);
      }

      // pagnination
      const limit = 5;
      if (filters?.page) {
        const from = ((filters?.page ?? 1) - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);
      }

      const { data, error, count } = await query;

      const totalPages = Math.ceil((count || 0) / limit);

      if (error) throw error;
      return { data, totalPages };
    },
  });
};

// get interview by id and status
export const useInterview = (interviewId: string) => {
  return useQuery({
    queryKey: ["interview", interviewId],
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (!user || authError) redirect("/auth/signin");

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
        .eq("seeker_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });
};

// update status
export const useUpdateInterviewStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      interviewId: string;
      status: "accept" | "decline";
      interviewerId: string;
    }) =>
      updateInterviewStatus(args.interviewId, args.status, args.interviewerId),
    onSuccess: () => {
      invalidateQuery(queryClient, ["interviews"]);
      invalidateQuery(queryClient, ["interview"]);
    },
    onError: (error) => {
      toast.error(
        error.message ? error.message : "Failed to update interview status.",
      );
      console.log("[useUpdateInterviewStatus]", error);
    },
  });
};

export const useDeleteInterview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      interviewId,
      seekerId,
    }: {
      interviewId: string;
      seekerId: string;
    }) => deleteInterview(interviewId, seekerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
      toast.success("Interview deleted successfully.");
    },
    onError: (error) => {
      toast.error(
        error.message ? error.message : "Failed to delete interview.",
      );
      console.log("[useDeleteInterview]", error);
    },
  });
};

// useNotifyBeforeInterview;
export const useNotifyBeforeInterview = () => {
  return useMutation({
    mutationFn: async (interviewId: string) => {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (!user || authError) redirect("/auth/signin");

      const { data, error } = await supabase
        .from("interviews")
        .select("id, scheduled_at")
        .eq("id", interviewId)
        .single();

      if (!data || error || !data.scheduled_at) throw error;

      await sendNotification(
        supabase,
        user.id,
        "interview_reminder",
        "Upcoming Interview Reminder ⏰",
        `Your interview is starting in 5 minutes at ${new Date(data.scheduled_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. Get ready!`,
        data.id,
      );
    },
  });
};
