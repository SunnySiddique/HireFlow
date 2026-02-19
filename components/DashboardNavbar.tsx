"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { employerLinks, jobSeekerLinks, notifications } from "@/constants";
import { useEmployerProfile } from "@/hooks/useEmployer";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useGetJobSeekerProfile } from "@/hooks/useJobSeeker";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/utils";
import {
  Bell,
  Check,
  Clock,
  LogOut,
  MonitorIcon,
  Moon,
  PaletteIcon,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const DashboardNavbar = ({ role }: { role: "job_seeker" | "employer" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { data: userProfile, isLoading: isLoadingUser } = useGetCurrentUser();
  const { data: jobSeekerProfile } = useGetJobSeekerProfile();
  const { data: employerProfile } = useEmployerProfile();

  const unreadCount = notifications.filter((n) => n.unread).length;
  const links = role === "job_seeker" ? jobSeekerLinks : employerLinks;
  const user = userProfile?.user_metadata;
  const profileImage =
    userProfile?.app_metadata?.provider === "google"
      ? user?.picture
      : user?.avatar_url;

  const jobSeekerImg =
    role === "job_seeker"
      ? (jobSeekerProfile?.profile?.profile_url ?? profileImage)
      : employerProfile?.company_logo_url;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    toast.success("Signout successfully");
    router.push("/auth/signin");
  };

  if (isLoadingUser) return <Loader />;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border transition-all duration-300">
      <div className="max-w-370 mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transform hover:scale-105 transition-transform">
            <span className="text-primary-foreground font-black text-lg">
              TH
            </span>
          </div>
          <span className="text-2xl font-black text-primary hidden sm:inline">
            TalentHub
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <DropdownMenu
            open={notificationsOpen}
            onOpenChange={setNotificationsOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent transition-colors"
              >
                <Bell className="size-5 text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-96 max-h-96 overflow-y-auto"
            >
              <div className="px-4 py-3 border-b border-border sticky top-0 bg-card">
                <h2 className="text-sm font-semibold text-foreground">
                  Notifications
                </h2>
              </div>

              {notifications.length > 0 ? (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                      <button
                        key={notification.id}
                        className={`w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors ${
                          notification.unread ? "bg-muted/30" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`mt-1 flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center ${
                              notification.unread ? "bg-primary/20" : "bg-muted"
                            }`}
                          >
                            <IconComponent
                              className={`h-5 w-5 ${notification.unread ? "text-primary" : "text-muted-foreground"}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-foreground truncate">
                                {notification.title}
                              </p>
                              {notification.unread && (
                                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {notification.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    No notifications yet
                  </p>
                </div>
              )}

              <div className="border-t border-border px-4 py-3 sticky bottom-0 bg-card">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-primary hover:bg-muted"
                >
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Profile Dropdown Menu */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0 border border-border hover:bg-accent transition-colors"
              >
                <Avatar className="h-10 w-10">
                  {jobSeekerImg ? (
                    <AvatarImage
                      src={jobSeekerImg || "/placeholder.svg"}
                      alt={
                        jobSeekerProfile?.profile?.full_name ||
                        employerProfile?.company_name ||
                        "User"
                      }
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(
                        jobSeekerProfile?.profile?.full_name ??
                          employerProfile?.company_name ??
                          "User",
                      )}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* User Info */}
              <div className="flex items-center gap-3 px-2 py-3">
                <Avatar className="h-10 w-10">
                  {jobSeekerImg ? (
                    <AvatarImage
                      src={jobSeekerImg || "/placeholder.svg"}
                      alt={
                        jobSeekerProfile?.profile?.full_name ||
                        employerProfile?.company_name ||
                        "User"
                      }
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(
                        jobSeekerProfile?.profile?.full_name ??
                          employerProfile?.company_name ??
                          "User",
                      )}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-foreground">
                    {role === "job_seeker"
                      ? jobSeekerProfile?.profile?.full_name
                      : employerProfile?.company_name}
                  </p>
                </div>
              </div>

              {/* Profile Option */}
              {links.map((link) => {
                return (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link
                      href={
                        typeof link.href === "function"
                          ? link.href(
                              role === "job_seeker"
                                ? jobSeekerProfile?.profile?.slug
                                : employerProfile?.slug,
                            )
                          : link.href
                      }
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <PaletteIcon />
                    Theme
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-44">
                      <DropdownMenuLabel>Appearance</DropdownMenuLabel>

                      <DropdownMenuItem
                        onClick={() => setTheme("light")}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Sun className="w-4 h-4" />
                        <span>Light</span>
                        {theme === "light" && (
                          <Check className="w-4 h-4 ml-auto text-primary" />
                        )}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setTheme("dark")}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Moon className="w-4 h-4" />
                        <span>Dark</span>
                        {theme === "dark" && (
                          <Check className="w-4 h-4 ml-auto text-primary" />
                        )}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setTheme("system")}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <MonitorIcon />

                        <span>System</span>
                        {theme === "system" && (
                          <Check className="w-4 h-4 ml-auto text-primary" />
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Logout Option */}
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
