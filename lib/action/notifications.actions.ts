"use server";

import { serverAuth } from "../auth/serverAuth";
import { createClient } from "../supabase/client";

// read notification
export async function markNotificationAsRead(notifyId: string) {
  const supabase = createClient();

  const user = await serverAuth();

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notifyId)
    .eq("user_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
}

// read all notifications
export async function markAllNotificationAsRead() {
  const supabase = createClient();

  const user = await serverAuth();

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
}

// delete single notification
export async function deleteNotification(notifyId: string) {
  const supabase = createClient();

  const user = await serverAuth();

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notifyId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

// delete all notifications
export async function deleteAllNotifications() {
  const supabase = createClient();

  const user = await serverAuth();

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}
