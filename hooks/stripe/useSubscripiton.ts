import { getSubscription } from "@/lib/action/stripe/stripe.actions";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUserSubscription = () => {
  return useQuery({
    queryKey: ["current-subscription"],
    queryFn: getSubscription,
    staleTime: 1000 * 60 * 10,
  });
};
