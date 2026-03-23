import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const useGetCurrentUserSubscription = () => {
  return useQuery({
    queryKey: ["currentUserSubscription"],
    queryFn: async () => {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) redirect("/auth/signin");

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw new Error(error.message);

      return data;
    },
  });
};
