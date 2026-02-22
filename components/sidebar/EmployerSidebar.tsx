"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Building2,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  PlusCircle,
  Users,
  Zap,
} from "lucide-react";

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
import { employerLinks } from "@/constants";
import { useEmployerProfile } from "@/hooks/useEmployer";
import { createClient } from "@/lib/supabase/client";
import { getInitials } from "@/lib/utils";
import { Check, MonitorIcon, Moon, PaletteIcon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const EmployerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: empProfile } = useEmployerProfile();
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

  return (
    <>
      <aside className="w-70 bg-background text-sidebar-foreground border-r border-sidebar-border flex flex-col fixed left-0 top-0 h-screen">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-8 h-8 bg-sidebar-primary text-sidebar-primary-foreground rounded flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg font-sans">HireFlow</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Section */}
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wider mb-3 px-2">
              Main
            </p>
            <div className="space-y-2">
              <Link
                href="/employer/dashboard"
                className={`${isActive("/employer/dashboard") ? "bg-sidebar border-l-4 border-sidebar-primary text-sidebar-primary" : "hover:bg-muted-foreground/10"} flex items-center gap-3 px-4 py-3 rounded-md  cursor-pointer`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link
                href="/employer/jobs"
                className={`${isActive("/employer/jobs") ? "bg-sidebar border-l-4 border-sidebar-primary text-sidebar-primary" : "hover:bg-muted-foreground/10"} flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-medium">Manage Jobs</span>
                </div>
                <Badge
                  variant="default"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  5
                </Badge>
              </Link>
              <Link
                href="/employer/applicants"
                className={`${isActive("/employer/applicants") ? "bg-sidebar border-l-4 border-sidebar-primary text-sidebar-primary" : "hover:bg-muted-foreground/10"} flex items-center gap-3 px-4 py-3 rounded-md  cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Applicants</span>
                </div>
                <Badge
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600"
                >
                  12
                </Badge>
              </Link>
            </div>
          </div>

          {/* Manage Section */}
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wider mb-3 px-2">
              Manage
            </p>
            <div className="space-y-2">
              <Link
                href="/employer/jobs/create"
                className={`${isActive("/employer/jobs/create") ? "bg-sidebar border-l-4 border-sidebar-primary text-sidebar-primary" : "hover:bg-muted-foreground/10"} flex items-center gap-3 px-4 py-3 rounded-md  cursor-pointer`}
              >
                <PlusCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Post a Job</span>
              </Link>
              <Link
                href={`/employer/${empProfile?.slug}`}
                className={`${isActive(`/employer/${empProfile?.slug}`) ? "bg-sidebar border-l-4 border-sidebar-primary text-sidebar-primary" : "hover:bg-muted-foreground/10"} flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer`}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Profile</span>
              </Link>
              {/* <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-sidebar-accent cursor-pointer">
                <BarChart2 className="w-4 h-4" />
                <span className="text-sm font-medium">Analytics</span>
              </div> */}
              {/* <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-sidebar-accent cursor-pointer">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </div> */}
            </div>
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
                <Avatar className="h-10 w-10 flex-shrink-0">
                  {empProfile?.company_logo_url ? (
                    <AvatarImage
                      src={empProfile?.company_logo_url || "/placeholder.svg"}
                      alt={empProfile?.company_name || "Company Logo"}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(empProfile?.company_name ?? "User")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 text-left ml-3 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {empProfile?.company_name || "TechNova Inc."}
                  </p>
                  <p className="text-xs text-muted-foreground">Employer</p>
                </div>
                <MoreVertical className="w-4 h-4 flex-shrink-0 ml-2" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* User Info */}
              <div className="flex items-center gap-3 px-2 py-3">
                <Avatar className="h-10 w-10">
                  {empProfile?.company_logo_url ? (
                    <AvatarImage
                      src={empProfile?.company_logo_url || "/placeholder.svg"}
                      alt={empProfile?.company_logo_url || "Company Logo"}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(empProfile?.company_name ?? "User")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-foreground">
                    {empProfile?.company_name}
                  </p>
                </div>
              </div>

              {/* Profile Option */}
              {employerLinks.map((link) => {
                return (
                  <DropdownMenuItem key={link.label} asChild>
                    <Link
                      href={
                        typeof link.href === "function"
                          ? link.href(empProfile?.slug ?? "")
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
      </aside>
    </>
  );
};

export default EmployerSidebar;
