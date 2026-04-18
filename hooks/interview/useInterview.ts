import {
  deleteInterview,
  interivew,
  interviews,
  notifyBeforeInterview,
  sendInterviewInvite,
  upcomingInterviews,
  updateInterviewStatus,
} from "@/lib/action/interview/interview.actions";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { InterviewFilters, InterviewInvite } from "@/types/interview";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

// employer
export const useSendInterviewInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (interview: InterviewInvite) =>
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
    queryKey: [
      "interviews",
      role,
      filters?.page,
      filters?.status,
      filters?.search,
    ],
    queryFn: () => interviews(filters, role),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};

// get interview by id and status
export const useInterview = (interviewId: string) => {
  return useQuery({
    queryKey: ["interview", interviewId],
    queryFn: () => interivew(interviewId),
    staleTime: 1000 * 60 * 5,
    enabled: !!interviewId,
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
    mutationFn: (interviewId: string) => notifyBeforeInterview(interviewId),
  });
};

// upcoming interveiw
export const useUpcomingInterviews = (isView: boolean = false) => {
  return useQuery({
    queryKey: ["upcoming-interviews", isView],
    queryFn: () => upcomingInterviews(isView),
    staleTime: 1000 * 60 * 2,
  });
};
