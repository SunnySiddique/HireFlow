import { toError } from "../errors";
import { createClient } from "../supabase/client";

// read notification
export async function markNotificationAsRead(notifyId: string) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notifyId)
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log("[markNotificationAsRead]", error);
    throw toError(error);
  }
}

// read all notifications
export async function markAllNotificationAsRead() {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log("[markAllNotificationAsRead]", error);
    throw toError(error);
  }
}

// delete single notification
export async function deleteNotification(notifyId: string) {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return;

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notifyId)
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log("[deleteAllNotifications]", error);
    throw toError(error);
  }
}

// delete all notifications
export async function deleteAllNotifications() {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return;

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log("[deleteAllNotifications]", error);
    throw toError(error);
  }
}
