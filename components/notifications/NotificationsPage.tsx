"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/constants/notificationData";
import {
  useDeleteAllNotifications,
  useMarkAllNotificationsAsRead,
  useNotifications,
} from "@/hooks/useNotifications";
import { NotificationType } from "@/types/notification";
import { useState } from "react";
import { NotificationActions } from "./NotificationActions";
import NotificationLists from "./NotificationLists";

const NotificationsPage = ({ role }: { role: "job-seeker" | "employer" }) => {
  // hook
  const { mutate: deleteAllNotifications, isPending } =
    useDeleteAllNotifications();
  const { mutate: markAllNotificationsAsRead } =
    useMarkAllNotificationsAsRead();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { data } = useNotifications();
  const notifications = (data?.notifications ?? []).map((n) => ({
    ...n,
    type: n.type as NotificationType | null,
  }));

  const filteredNotifications = notifications.filter((n) => {
    if (activeCategory === "all") return true;
    return n.type?.toLowerCase() === activeCategory.toLowerCase();
  });

  const unreadNotifications = notifications.filter((n) => !n.is_read);

  return (
    <main className="px-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your job search and account activity.
          </p>
        </div>
        <NotificationActions
          onMarkAllRead={() => markAllNotificationsAsRead()}
          onDeleteAll={() => deleteAllNotifications()}
          disabled={notifications.length === 0}
          isDeleting={isPending}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                Categories
              </h3>

              {categories
                .filter((cat) => {
                  if (role === "employer" && cat.key === "job_match")
                    return false;
                  return true;
                })
                .map((cat) => (
                  <Button
                    key={cat.key}
                    className={`w-full justify-start gap-3 font-medium px-2 transition-colors duration-200 ${
                      activeCategory === cat.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-primary/10"
                    }`}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    {cat.icon} {cat.label}
                    <span className="ml-auto text-xs">
                      {cat.key === "all"
                        ? notifications.length
                        : notifications.filter((n) => n.type === cat.key)
                            .length}
                    </span>
                  </Button>
                ))}
            </div>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-background border border-border w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0 space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <NotificationLists
                    notification={notification}
                    key={notification.id}
                    role={role}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No notifications yet
                </p>
              )}
            </TabsContent>
            <TabsContent value="unread" className="mt-0 space-y-4">
              {unreadNotifications.length > 0 ? (
                unreadNotifications
                  .filter((notification) => !notification.is_read)
                  .map((notification) => (
                    <NotificationLists
                      notification={notification}
                      key={notification.id}
                      role={role}
                    />
                  ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No notifications yet
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default NotificationsPage;
