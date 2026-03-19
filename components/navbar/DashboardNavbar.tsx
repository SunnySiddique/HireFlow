import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  getNotificationLink,
  NotificationIcon,
} from "@/constants/notificationData";
import { useEmployerProfile } from "@/hooks/useEmployer";
import { useGetJobSeekerProfile } from "@/hooks/useJobSeeker";
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from "@/hooks/useNotifications";
import { createClient } from "@/lib/supabase/client";
import { getInitials, timeAgo } from "@/lib/utils";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface DashboardNavbarProps {
  role: "job-seeker" | "employer";
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

const DashboardNavbar = ({
  role,
  onMenuClick,
  isSidebarOpen = false,
}: DashboardNavbarProps) => {
  // hooks
  const { data: jobSeekerProfile } = useGetJobSeekerProfile();
  const { data: employerProfile } = useEmployerProfile();
  const { mutate: markNotificationAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllNotificationsAsRead } =
    useMarkAllNotificationsAsRead();
  const { data } = useNotifications();
  const queryClient = useQueryClient();

  // state
  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);

  const notifications = data?.notifications ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  useEffect(() => {
    const supabase = createClient();

    let channel: RealtimeChannel | null = null;

    const setupRealtime = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      channel = supabase
        .channel(`notifications:${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            queryClient.invalidateQueries({
              queryKey: ["notifications"],
            });
          },
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return (
    <div className="px-4 lg:px-8 py-4 bg-background border-b border-border/40 sticky top-0 z-30 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
            Welcome back,{" "}
            <span className="text-primary">
              {role === "job-seeker"
                ? (jobSeekerProfile?.full_name ?? "Jone")
                : (employerProfile?.company_name ?? "MT")}
              !
            </span>
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            {role === "job-seeker"
              ? `Here's what's happening with your job search today.`
              : `Here's what's happening with your job listings today.`}
          </p>
        </motion.div>

        {/* Quick Search & Notifications */}
        <div className="flex justify-end items-center gap-3">
          {/* Bell — sm+ only */}
          <div className="hidden sm:block">
            <Popover
              open={isOpenNotificationModal}
              onOpenChange={setIsOpenNotificationModal}
            >
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer group">
                  <Card className="p-2 lg:p-3 bg-background border border-border relative hover:border-primary transition-all hover:shadow-md">
                    <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background"
                      >
                        {unreadCount}
                      </motion.span>
                    )}
                  </Card>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-[calc(100vw-2rem)] sm:w-96 p-0 mr-2 sm:mr-4 mt-2 overflow-hidden border-border shadow-2xl rounded-2xl"
                align="end"
              >
                <div className="p-4 bg-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-lg">Notifications</h2>
                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full font-semibold">
                      {unreadCount} New
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8 hover:bg-primary/10 text-primary font-medium"
                    onClick={() => markAllNotificationsAsRead()}
                  >
                    Mark all as read
                  </Button>
                </div>
                <Separator />
                <ScrollArea className="h-[300px] sm:h-[400px]">
                  <div className="flex flex-col">
                    {notifications.map((notification, index) => (
                      <a
                        href={getNotificationLink(
                          notification.type as string,
                          notification.reference_id,
                          role,
                        )}
                        key={notification.id}
                        onClick={() => {
                          markNotificationAsRead(notification.id as string);
                          setIsOpenNotificationModal(false);
                        }}
                        target="_blank"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors relative group ${notification.is_read ? "bg-primary/[0.02]" : ""}`}
                        >
                          <div className="flex gap-3 sm:gap-4">
                            <div
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.is_read ? "bg-primary/10" : "bg-muted"}`}
                            >
                              <NotificationIcon type={notification.type} />
                            </div>
                            <div className="flex-1 space-y-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4
                                  className={`text-sm font-semibold truncate ${notification.is_read ? "text-foreground" : "text-muted-foreground"}`}
                                >
                                  {notification.title}
                                </h4>
                                <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">
                                  {timeAgo(notification.created_at)}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                {notification.message}
                              </p>
                            </div>
                            {!notification.is_read && (
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                        </motion.div>
                      </a>
                    ))}
                  </div>
                </ScrollArea>
                <Separator />
                <div className="p-3 text-center">
                  <Link
                    href={
                      role === "job-seeker"
                        ? `/job-seeker/notifications`
                        : `/employer/notifications`
                    }
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs text-muted-foreground hover:text-primary"
                      onClick={() => setIsOpenNotificationModal(false)}
                    >
                      View all notifications
                    </Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="hidden sm:block">
            <Link
              href={
                role === "job-seeker"
                  ? `/job-seeker/${jobSeekerProfile?.slug ?? "profile"}`
                  : `/employer/${employerProfile?.slug ?? "company"}`
              }
            >
              {role === "job-seeker" ? (
                <Avatar className="h-10 w-10 lg:h-12 lg:w-12 border-2 border-primary cursor-pointer hover:scale-105 transition-transform shadow-sm">
                  {jobSeekerProfile?.profile_url ? (
                    <AvatarImage
                      src={jobSeekerProfile?.profile_url || "/placeholder.svg"}
                      alt={jobSeekerProfile?.full_name || "Job-seeker logo"}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {getInitials(jobSeekerProfile?.full_name ?? "Jone")}
                    </AvatarFallback>
                  )}
                </Avatar>
              ) : (
                <Avatar className="h-10 w-10 lg:h-12 lg:w-12 cursor-pointer hover:scale-105 transition-transform shadow-sm">
                  {employerProfile?.company_logo_url ? (
                    <AvatarImage
                      src={
                        employerProfile?.company_logo_url || "/placeholder.svg"
                      }
                      alt={employerProfile?.company_name || "Employer logo"}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {getInitials(
                        (employerProfile?.company_name as string) ?? "MT",
                      )}
                    </AvatarFallback>
                  )}
                </Avatar>
              )}
            </Link>
          </div>

          {/* Menu icon — mobile only */}
          <div className="block sm:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onMenuClick}
              className="p-2 rounded-lg border border-border bg-background hover:border-primary hover:shadow-md transition-all group"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              ) : (
                <Menu className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
