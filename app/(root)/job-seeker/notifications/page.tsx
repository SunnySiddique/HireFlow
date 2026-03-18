"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Briefcase,
  Check,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import NotificationContent from "./_components/NotificationContent";

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "match":
      return <Briefcase className="w-5 h-5 text-blue-500" />;
    case "view":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "interview":
      return <Clock className="w-5 h-5 text-purple-500" />;
    case "message":
      return <Bell className="w-5 h-5 text-pink-500" />;
    default:
      return <Sparkles className="w-5 h-5 text-amber-500" />;
  }
};

const staticNotifications = [
  {
    id: 1,
    title: "New Job Match",
    description:
      "A new Senior Frontend Developer position matches your profile at TechCorp.",
    time: "2 hours ago",
    date: "March 13, 2026",
    type: "match",
    unread: true,
  },
  {
    id: 2,
    title: "Application Viewed",
    description:
      "Global Solutions viewed your application for 'React Developer'.",
    time: "5 hours ago",
    date: "March 13, 2026",
    type: "view",
    unread: true,
  },
  {
    id: 3,
    title: "Interview Scheduled",
    description:
      "Your interview with InnovateSoft is confirmed for tomorrow at 10:00 AM.",
    time: "1 day ago",
    date: "March 12, 2026",
    type: "interview",
    unread: true,
  },
  {
    id: 4,
    title: "Profile Update",
    description:
      "Your profile completeness is now at 85%. Add your certifications to reach 100%.",
    time: "2 days ago",
    date: "March 11, 2026",
    type: "system",
    unread: false,
  },
];

const categories = [
  {
    key: "all",
    label: "All Notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  { key: "job", label: "Job Matches", icon: <Briefcase className="w-4 h-4" /> },
  {
    key: "applications",
    label: "Applications",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
];

export default function NotificationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  return (
    <main className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your job search and account activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> Mark all as read
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                className="pl-9 bg-muted/50 border-none"
                readOnly
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                Categories
              </h3>

              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  className={`w-full justify-start gap-3 font-medium px-2 transition-colors duration-200
            ${
              activeCategory === cat.key
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground hover:bg-primary/10"
            }`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.icon} {cat.label}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-background border border-border">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Sort: Newest</span>
              </div>
            </div>

            <TabsContent value="all" className="mt-0 space-y-4">
              {staticNotifications.map((notification) => (
                <NotificationContent
                  notification={notification}
                  key={notification.id}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
