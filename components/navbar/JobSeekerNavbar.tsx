import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useGetJobSeekerProfile } from "@/hooks/useJobSeeker";
import { motion } from "framer-motion";
import {
  Bell,
  Briefcase,
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const notifications = [
  {
    id: 1,
    title: "New Job Match",
    description:
      "A new Senior Frontend Developer position matches your profile at TechCorp.",
    time: "2 hours ago",
    type: "match",
    unread: true,
  },
  {
    id: 2,
    title: "Application Viewed",
    description:
      "Global Solutions viewed your application for 'React Developer'.",
    time: "5 hours ago",
    type: "view",
    unread: true,
  },
  {
    id: 3,
    title: "Interview Scheduled",
    description:
      "Your interview with InnovateSoft is confirmed for tomorrow at 10:00 AM.",
    time: "1 day ago",
    type: "interview",
    unread: true,
  },
  {
    id: 4,
    title: "Profile Update",
    description:
      "Your profile completeness is now at 85%. Add your certifications to reach 100%.",
    time: "2 days ago",
    type: "system",
    unread: false,
  },
];

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "match":
      return <Briefcase className="w-4 h-4 text-blue-500" />;
    case "view":
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case "interview":
      return <Clock className="w-4 h-4 text-purple-500" />;
    default:
      return <Sparkles className="w-4 h-4 text-amber-500" />;
  }
};

const JobSeekerNavbar = () => {
  const { data: jobSeekerProfile } = useGetJobSeekerProfile();

  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => n.unread).length,
  );

  const markAllAsRead = () => {
    setUnreadCount(0);
  };
  return (
    <div className="px-4 lg:px-8 py-4 bg-background border-b border-border/40 sticky top-0 z-50 backdrop-blur-md">
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
              {jobSeekerProfile?.full_name ?? "John"}!
            </span>
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Here&apos;s what&apos;s happening with your job search today.
          </p>
        </motion.div>

        {/* Quick Search & Notifications */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Link href="/job-seeker/jobs">
            <Card className="p-2 lg:p-3 bg-background border border-border hover:border-primary cursor-pointer transition-all hover:shadow-md group">
              <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Card>
          </Link>

          {/* Notifications Popover */}
          <Popover>
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
              className="w-80 sm:w-96 p-0 mr-4 mt-2 overflow-hidden border-border shadow-2xl rounded-2xl"
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
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              </div>
              <Separator />
              <ScrollArea className="h-[400px]">
                <div className="flex flex-col">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors relative group ${notification.unread ? "bg-primary/[0.02]" : ""}`}
                    >
                      <div className="flex gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.unread ? "bg-primary/10" : "bg-muted"}`}
                        >
                          <NotificationIcon type={notification.type} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`text-sm font-semibold ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h4>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {notification.description}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
              <Separator />
              <div className="p-3 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-muted-foreground hover:text-primary"
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Avatar */}
          <Link href={`/job-seeker/${jobSeekerProfile?.slug ?? "profile"}`}>
            <Avatar className="h-10 w-10 lg:h-12 lg:w-12 border-2 border-primary cursor-pointer hover:scale-105 transition-transform shadow-sm">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                {jobSeekerProfile?.full_name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") ?? "JD"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      {/* Tips Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="mt-4 p-3 lg:p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 overflow-hidden relative group cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 lg:w-5 h-4 lg:h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm lg:text-base font-semibold text-foreground mb-1 flex items-center gap-2">
                💡 Interview Tip of the Day
              </h3>
              <p className="text-xs lg:text-sm text-muted-foreground">
                Prepare for your upcoming interviews by researching company
                culture and practicing common questions.{" "}
                <Link
                  href="/job-seeker/resources"
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  Learn more <span className="text-lg">→</span>
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default JobSeekerNavbar;
