import {
  trackEmployerProfileView,
  trackJobView,
  trackSeekerProfileView,
} from "@/lib/action/profile-view.actions";
import { useMutation } from "@tanstack/react-query";

export const useTrackSeekerProfileView = () => {
  return useMutation({
    mutationFn: (seekerId: string) => trackSeekerProfileView(seekerId),
  });
};

export const useTrackEmployerProfileView = () => {
  return useMutation({
    mutationFn: (employerId: string) => trackEmployerProfileView(employerId),
  });
};

export const useTrackJobView = () => {
  return useMutation({
    mutationFn: (jobId: string) => trackJobView(jobId),
  });
};
