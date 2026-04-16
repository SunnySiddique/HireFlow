"use server";

import {
  deleteAllNotificationsService,
  deleteNotificationService,
  markAllNotificationAsReadService,
  markNotificationAsReadService,
  notificationsService,
} from "@/lib/services/notification/notification.service";

// notifications
export async function notifications() {
  return notificationsService();
}

// read notification
export async function markNotificationAsRead(notifyId: string) {
  return markNotificationAsReadService(notifyId);
}

// read all notifications
export async function markAllNotificationAsRead() {
  return markAllNotificationAsReadService();
}

// delete single notification
export async function deleteNotification(notifyId: string) {
  return deleteNotificationService(notifyId);
}

// delete all notifications
export async function deleteAllNotifications() {
  return deleteAllNotificationsService();
}
