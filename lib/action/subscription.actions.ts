"use server";

import { redirect } from "next/navigation";
import { toError } from "../errors";
import { createClient } from "../supabase/server";

// employer
export async function increaseJobUsedPost(jobUsed: number) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) redirect("/auth/signin");

    const { error } = await supabase
      .from("subscriptions")
      .update({ job_posts_used: jobUsed })
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log("[getCurrentUserSubscription]:", error);
    throw toError(error);
  }
}
