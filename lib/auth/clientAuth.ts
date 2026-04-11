import { SupabaseClient, User } from "@supabase/supabase-js";

export const getClientUser = async (
  supabase: SupabaseClient,
): Promise<User | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("UNAUTHORIZED");

  return user;
};
