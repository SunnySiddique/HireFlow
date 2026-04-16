import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getNotificationLink,
  NotificationIcon,
} from "@/constants/notificationData";
import {
  useDeleteNotification,
  useMarkNotificationAsRead,
} from "@/hooks/notification/useNotifications";
import { Notification } from "@/types/notification";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

const NotificationLists = ({
  notification,
  role,
}: {
  notification: Notification;
  role: "job-seeker" | "employer";
}) => {
  const { mutateAsync: markNotificationAsRead } = useMarkNotificationAsRead();
  const { mutateAsync: deleteNotification } = useDeleteNotification();
  console.log(notification);
  const handleMarkNotificationAsRead = async (notifyId: string) => {
    await markNotificationAsRead(notifyId, {
      onSuccess: () => {
        toast.success("You've read this notification! 🎉");
      },
    });
  };

  const handlDeleteNotification = async (notifyId: string) => {
    await deleteNotification(notifyId, {
      onSuccess: () => {
        toast.success("Notification removed! 🎉");
      },
    });
  };
  return (
    <>
      <Card
        className={`p-5 relative group transition-all hover:shadow-md border-l-4 ${!notification.is_read ? "border-l-primary bg-primary/[0.01]" : "border-l-transparent"}`}
      >
        <div className="flex gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${notification.is_read ? "bg-primary/10" : "bg-muted"}`}
          >
            <NotificationIcon type={notification.type ?? "N/A"} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3
                  className={`font-bold truncate ${notification.is_read ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {notification.title}
                </h3>
                {!notification.is_read && (
                  <Badge
                    variant="default"
                    className="h-5 px-1.5 text-[10px] uppercase tracking-wider"
                  >
                    New
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {/* {notification.time} */}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        handleMarkNotificationAsRead(notification.id)
                      }
                    >
                      Mark as read
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handlDeleteNotification(notification.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {notification.message}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={
                  getNotificationLink(
                    notification.type as string,
                    notification.reference_id,
                    role,
                  ) as string
                }
                target="_blank"
              >
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs font-semibold text-primary"
                >
                  View Details
                </Button>
              </a>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                {/* {} */}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default NotificationLists;
