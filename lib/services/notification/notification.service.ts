import { getServerUser } from "@/lib/action/auth/serverAuth";

// notifications
export async function notificationsService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  if (!user) return { notifications: [], unreadCount: 0 };

  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) throw error.message;

  const unreadCount = (notifications ?? []).filter(
    (notification) => !notification.is_read,
  ).length;

  return { notifications: notifications ?? [], unreadCount };
}

// read notification
export async function markNotificationAsReadService(notifyId: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notifyId)
    .eq("user_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
}

// read all notifications
export async function markAllNotificationAsReadService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
}

// delete single notification
export async function deleteNotificationService(notifyId: string) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notifyId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

// delete all notifications
export async function deleteAllNotificationsService() {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}
