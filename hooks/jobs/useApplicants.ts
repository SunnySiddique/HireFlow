import {
  archiveApplicant,
  employerApplicants,
  updateApplicantStatus,
} from "@/lib/action/jobs/applicants.actions";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { InterviewFilters } from "@/types/interview";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// employer
export const useEmployerApplicants = (filters?: InterviewFilters) => {
  return useQuery({
    queryKey: ["applicants", filters?.status, filters?.page, filters?.archived],
    staleTime: 1000 * 60 * 2,
    queryFn: () => employerApplicants(filters),
  });
};

export const useUpdateApplicantStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicantId,
      status,
      employer_notes,
    }: {
      applicantId: string;
      status: string;
      employer_notes: string;
    }) => updateApplicantStatus(applicantId, status, employer_notes),
    onSuccess: () => {
      invalidateQuery(queryClient, ["applicants"]);
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong updating applicant status",
      );
    },
  });
};

export const useArchiveApplicant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      applicationId,
      isArchived,
    }: {
      applicationId: string;
      isArchived: boolean;
    }) => archiveApplicant(applicationId, isArchived),
    onSuccess: () => {
      invalidateQuery(queryClient, ["applicants"]);
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong adding archive applicant",
      );
    },
  });
};
