import type { User } from "@supabase/supabase-js";
import { getClientUser } from "./clientAuth";

export const withAuth = async <T>(
  fn: (user: User) => Promise<T>,
): Promise<T> => {
  const user = await getClientUser();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return fn(user);
};
