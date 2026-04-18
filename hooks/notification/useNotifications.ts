import {
  deleteAllNotifications,
  deleteNotification,
  markAllNotificationAsRead,
  markNotificationAsRead,
  notifications,
} from "@/lib/action/notification/notifications.actions";
import { invalidateQuery } from "@/lib/react-query/invalidateQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// all notifications
export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notifications,
    staleTime: 0,
  });
};

// mark notification as read
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notifyId: string) => markNotificationAsRead(notifyId),
    onSuccess: () => {
      invalidateQuery(queryClient, ["notifications"]);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};

// mark all notifications as read
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => markAllNotificationAsRead(),
    onSuccess: () => {
      invalidateQuery(queryClient, ["notifications"]);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};

// delete notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notifyId: string) => deleteNotification(notifyId),
    onSuccess: () => {
      invalidateQuery(queryClient, ["notifications"]);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};

// delete all notifications
export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAllNotifications(),
    onSuccess: () => {
      invalidateQuery(queryClient, ["notifications"]);
      toast.success("All notifications cleared! 🎉 You're all caught up!");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};
