"use server";

import { serverAuth } from "../auth/serverAuth";
import { createClient } from "../supabase/server";

// employer
export async function increaseJobUsedPost(jobUsed: number) {
  const supabase = await createClient();

  const user = await serverAuth();

  const { error } = await supabase
    .from("subscriptions")
    .update({ job_posts_used: jobUsed })
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

//
export async function getSubscription(userId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("subscriptions")
    .select("subscription_status, plan_expires_at, plan")
    .eq("user_id", userId)
    .maybeSingle();

  return data;
}
