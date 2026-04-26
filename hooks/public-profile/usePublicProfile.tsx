import { companyProfile } from "@/lib/action/public-profile/public.actions";
import { useQuery } from "@tanstack/react-query";

export const useCompanyProfile = (slug: string) => {
  return useQuery({
    queryKey: ["company", slug],
    queryFn: () => companyProfile(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};
