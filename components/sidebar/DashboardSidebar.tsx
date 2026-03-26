"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, MoreVertical, X, Zap } from "lucide-react";

import { AvatarImage } from "@/components/ui/avatar";
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
import { employerLinks, FREE_LINKS, jobSeekerLinks } from "@/constants";
import { useEmployerProfile } from "@/hooks/useEmployer";
import { useGetJobSeekerProfile } from "@/hooks/useJobSeeker";
import { useGetCurrentUserSubscription } from "@/hooks/useSubscripiton";
import { createClient } from "@/lib/supabase/client";
import { getInitials, hasAccess } from "@/lib/utils";
import { Check, MonitorIcon, Moon, PaletteIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  role: "job-seeker" | "employer";
}

const DashboardSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  role,
}: DashboardSidebarProps) => {
  // hook
  const { data: jobSeekerProfile } = useGetJobSeekerProfile();
  const { data: employerProfile } = useEmployerProfile();
  const { data: subscription } = useGetCurrentUserSubscription();
  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );

  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    toast.success("Signout successfully");
    router.push("/auth/signin");
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const links = role === "employer" ? employerLinks : jobSeekerLinks;

  const filteredLinks = links.filter((link) => {
    if (!isSubscribed) {
      return FREE_LINKS[role].includes(link.label);
    }
    if (!link.plan) return true;

    return subscription?.plan === link.plan;
  });

  const mainLinks = filteredLinks.filter((l) => l.section === "main");
  const manageLinks = filteredLinks.filter((l) => l.section === "manage");

  const renderLink = (link: any) => {
    const href =
      typeof link.href === "function"
        ? link.href(
            role === "job-seeker"
              ? (jobSeekerProfile?.slug ?? "")
              : (employerProfile?.slug ?? ""),
          )
        : link.href;

    return (
      <Link
        key={link.label}
        href={href}
        className={`${
          isActive(href)
            ? "bg-sidebar border-l-4 border-sidebar-primary text-sidebar-primary"
            : "hover:bg-muted-foreground/10"
        } flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer`}
        onClick={() => setSidebarOpen(false)}
      >
        {link.icon && <link.icon className="w-4 h-4" />}
        <span className="text-sm font-medium">{link.label}</span>
      </Link>
    );
  };
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/75 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-70 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col z-40 transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 lg:p-6 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary text-sidebar-primary-foreground rounded flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg font-sans">HireFlow</span>
          </div>
          <button
            className="lg:hidden text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Section */}
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wider mb-3 px-2">
              Main
            </p>

            <div className="space-y-2">{mainLinks.map(renderLink)}</div>
          </div>

          {/* Manage Section */}
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wider mb-3 px-2">
              Manage
            </p>

            <div className="space-y-2">{manageLinks.map(renderLink)}</div>
          </div>
        </nav>
        {/* Bottom User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-auto px-3 py-2 rounded-lg justify-start hover:bg-sidebar-accent transition-colors"
              >
                {role === "job-seeker" ? (
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    {jobSeekerProfile?.profile_url ? (
                      <AvatarImage
                        src={
                          jobSeekerProfile?.profile_url || "/placeholder.svg"
                        }
                        alt={jobSeekerProfile?.full_name || "User Profile"}
                      />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {getInitials(jobSeekerProfile?.full_name ?? "User")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ) : (
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    {employerProfile?.company_logo_url ? (
                      <AvatarImage
                        src={
                          employerProfile?.company_logo_url ||
                          "/placeholder.svg"
                        }
                        alt={employerProfile?.company_name || "User Profile"}
                      />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {getInitials(employerProfile?.company_name ?? "User")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}
                <div className="flex-1 text-left ml-3 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {role === "job-seeker"
                      ? (jobSeekerProfile?.full_name ?? "John Doe")
                      : (employerProfile?.company_name ?? "John Doe")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {role === "job-seeker" ? "Job Seeker" : "Employer"}
                  </p>
                </div>
                <MoreVertical className="w-4 h-4 flex-shrink-0 ml-2" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* User Info */}
              <div className="flex items-center gap-3 px-2 py-3">
                {role === "job-seeker" ? (
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    {jobSeekerProfile?.profile_url ? (
                      <AvatarImage
                        src={
                          jobSeekerProfile?.profile_url || "/placeholder.svg"
                        }
                        alt={jobSeekerProfile?.full_name || "User Profile"}
                      />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {getInitials(jobSeekerProfile?.full_name ?? "User")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ) : (
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    {employerProfile?.company_logo_url ? (
                      <AvatarImage
                        src={
                          employerProfile?.company_logo_url ||
                          "/placeholder.svg"
                        }
                        alt={employerProfile?.company_name || "User Profile"}
                      />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {getInitials(employerProfile?.company_name ?? "User")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}

                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-foreground">
                    {role === "job-seeker"
                      ? (jobSeekerProfile?.full_name ?? "JB")
                      : (employerProfile?.company_name ?? "CM")}
                  </p>
                </div>
              </div>

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
      </aside>
    </>
  );
};

export default DashboardSidebar;
