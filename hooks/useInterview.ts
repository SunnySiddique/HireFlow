import {
  deleteInterview,
  sendInterviewInvite,
} from "@/lib/action/interview.actions";
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

export const useEmployerInterviews = (filters?: InterviewFilters) => {
  return useQuery({
    queryKey: [
      "interviews",
      filters?.search,
      filters?.status,
      filters?.type,
      filters?.page,
    ],
    queryFn: async () => {
      const supabase = await createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) redirect("/auth/signin");

      let query = supabase
        .from("interviews")
        .select(
          `*,
          seeker:seeker_id(profile_url)
          `,
          { count: "exact" },
        )
        .eq("interviewer_id", user.id);

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

export const useDeleteInterview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (interviewId: string) => deleteInterview(interviewId),
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

// seeker
export const useSeekerInterviews = (filters?: InterviewFilters) => {
  return useQuery({
    queryKey: ["interviews", filters?.search, filters?.status, filters?.page],
    queryFn: async () => {
      const supabase = await createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) redirect("/auth/signin");

      let query = supabase
        .from("interviews")
        .select(
          `
          status,
          interview_type,
          scheduled_at,
          duration_minutes,
          meeting_link,
          interviewer_name,
          interviewer_title,
          message,
          notes,
          feedback
          ,
          employer:interviewer_id(company_logo_url, company_name)
          `,
          { count: "exact" },
        )
        .eq("seeker_id", user.id);

      if (filters?.search) {
        query = query.ilike("interviewer_name", `%${filters.search}%`);
      }

      if (filters?.status && filters?.status !== "all") {
        query = query.eq("status", filters?.status);
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
