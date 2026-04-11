import {
  trackEmployerProfileView,
  trackJobView,
  trackSeekerProfileView,
} from "@/lib/action/profile-view.actions";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useTrackSeekerProfileView = () => {
  return useMutation({
    mutationFn: (seekerId: string) => trackSeekerProfileView(seekerId),
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};

export const useTrackEmployerProfileView = () => {
  return useMutation({
    mutationFn: (employerId: string) => trackEmployerProfileView(employerId),
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};

export const useTrackJobView = () => {
  return useMutation({
    mutationFn: (jobId: string) => trackJobView(jobId),
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};
