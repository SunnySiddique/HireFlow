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
    queryKey: ["interviews", filters],
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
        )
        .eq("interviewer_id", user.id);

      if (filters.search) {
        query = query.ilike("interviewer_name", `%${filters.search}%`);
      }

      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      if (filters.type && filters.type !== "all") {
        query = query.eq("interview_type", filters.type);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
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
