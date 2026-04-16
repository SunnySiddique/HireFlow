import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        toast.error(error.message);
        throw error;
      }

      return data.session?.user ?? null;
    },
  });
};
