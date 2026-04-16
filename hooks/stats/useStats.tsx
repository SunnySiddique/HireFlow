import {
  employerApplicationStats,
  seekerApplicationStats,
} from "@/lib/action/stats/stats.actions";
import { useQuery } from "@tanstack/react-query";

export const useSeekerApplicationStats = () =>
  useQuery({
    queryKey: ["seeker-application-stats"],
    queryFn: seekerApplicationStats,
    staleTime: 1000 * 60 * 5,
  });

export const useEmployerApplicationStats = () => {
  return useQuery({
    queryKey: ["employer-applicantion-stats"],
    queryFn: employerApplicationStats,
    staleTime: 1000 * 60 * 5,
  });
};
