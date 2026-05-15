"use client";

import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  MoreVertical,
  X,
  Zap,
} from "lucide-react";

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
import { FREE_LINKS, jobSeekerLinks } from "@/constants";
import { employerLinks } from "@/constants/employerData";
import { signOut } from "@/lib/action/auth/auth.actions";
import { hasAccess } from "@/lib/utils";
import { UserSubscription } from "@/types";
import { Employer } from "@/types/employer";
import { JobSeekerProfile } from "@/types/job-seeker";
import { Check, MonitorIcon, Moon, PaletteIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import SidebarAvatar from "./SidebarAvatar";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  role: "job-seeker" | "employer";
  seekerProfile: JobSeekerProfile | null;
  employerProfile: Employer | null;
  subscription: UserSubscription | null;
}

const DashboardSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  role,
  employerProfile,
  seekerProfile,
  subscription,
}: DashboardSidebarProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const isSubscribed = useMemo(
    () =>
      hasAccess(
        subscription?.subscription_status as string,
        subscription?.plan_expires_at as string,
      ),
    [subscription?.subscription_status, subscription?.plan_expires_at],
  );

  const isActive = useCallback((href: string) => pathname === href, [pathname]);

  const handleLogout = useCallback(() => {
    startTransition(async () => {
      router.push("/auth/signin");
      await signOut();
    });
  }, [router]);

  const { mainLinks, manageLinks } = useMemo(() => {
    const links = role === "employer" ? employerLinks : jobSeekerLinks;

    const filtered = links.filter((link) => {
      if (!isSubscribed) return FREE_LINKS[role].includes(link.label);
      if (!link.plan) return true;
      return (
        subscription?.plan === link.plan ||
        link?.plan === "starter" ||
        link?.plan === "explorer"
      );
    });

    return {
      mainLinks: filtered.filter((l) => l.section === "main"),
      manageLinks: filtered.filter((l) => l.section === "manage"),
    };
  }, [role, isSubscribed, subscription?.plan]);

  const { profileSlug, displayName, avatarSrc, avatarAlt } = useMemo(
    () => ({
      profileSlug:
        role === "job-seeker" ? seekerProfile?.slug : employerProfile?.slug,
      displayName:
        role === "job-seeker"
          ? (seekerProfile?.full_name ?? "User")
          : (employerProfile?.company_name ?? "Company"),
      avatarSrc:
        role === "job-seeker"
          ? seekerProfile?.profile_url
          : employerProfile?.company_logo_url,
      avatarAlt:
        role === "job-seeker"
          ? (seekerProfile?.full_name ?? "User Profile")
          : (employerProfile?.company_name ?? "Company Profile"),
    }),
    [role, seekerProfile, employerProfile],
  );

  const renderLink = useCallback(
    (link: any) => {
      const href =
        typeof link.href === "function"
          ? link.href(
              role === "job-seeker"
                ? (seekerProfile?.slug ?? "")
                : (employerProfile?.slug ?? ""),
            )
          : link.href;

      const active = isActive(href);

      return (
        <Link
          key={link.label}
          href={href}
          prefetch={true} // ✅ FIX 6: Explicit prefetch ensures routes are preloaded on hover
          // ✅ FIX 7: Close sidebar AFTER navigation starts, not before — eliminates the
          //    re-render that was racing with the router and causing perceived delay.
          //    Using startTransition here keeps the UI responsive during the state update.
          onClick={() => {
            if (sidebarOpen) {
              startTransition(() => setSidebarOpen(false));
            }
          }}
          className={`${
            active
              ? "bg-sidebar border-l-4 border-sidebar-primary text-sidebar-primary"
              : "hover:bg-muted-foreground/10"
          } flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer ${
            isCollapsed ? "justify-center p-5" : ""
          }`}
        >
          {link.icon && <link.icon className="w-4 h-4" />}
          {!isCollapsed && (
            <span className="text-sm font-medium">{link.label}</span>
          )}
        </Link>
      );
    },
    [
      role,
      seekerProfile?.slug,
      employerProfile?.slug,
      isActive,
      isCollapsed,
      sidebarOpen,
      setSidebarOpen,
    ],
  );

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col z-40 transition-all duration-300
          ${isCollapsed ? "w-24" : "w-60"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="hidden lg:flex absolute -right-4 top-6 w-8 h-8 rounded-full bg-sidebar border border-sidebar-border items-center justify-center text-sidebar-foreground z-50 hover:bg-sidebar-accent transition-colors shadow-sm"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Logo */}
        <div
          className={`p-4 lg:p-6 flex items-center border-b border-sidebar-border transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary text-sidebar-primary-foreground rounded flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg font-sans">HireFlow</span>
            )}
          </div>
          {!isCollapsed && (
            <button
              className="lg:hidden text-sidebar-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 overflow-y-auto p-4 ${isCollapsed ? "space-y-0" : "space-y-6"}`}
        >
          <div>
            {!isCollapsed && (
              <p className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wider mb-3 px-2">
                Main
              </p>
            )}
            <div className="space-y-1">{mainLinks.map(renderLink)}</div>
          </div>

          <div>
            {!isCollapsed && (
              <p className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wider mb-3 px-2">
                Manage
              </p>
            )}
            <div className="space-y-1">{manageLinks.map(renderLink)}</div>
          </div>
        </nav>

        {/* Bottom User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                disabled={isPending}
                className={`w-full h-auto py-2 rounded-lg transition-colors hover:bg-sidebar-accent ${
                  isCollapsed ? "px-0 justify-center" : "px-3 justify-start"
                }`}
              >
                {isPending ? (
                  <svg
                    className="w-5 h-5 animate-spin text-muted-foreground flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <SidebarAvatar
                    src={avatarSrc}
                    alt={avatarAlt}
                    displayName={displayName}
                    size="lg"
                  />
                )}

                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left ml-3 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {isPending ? "Signing out..." : displayName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {role === "job-seeker" ? "Job Seeker" : "Employer"}
                      </p>
                    </div>
                    <MoreVertical className="w-4 h-4 flex-shrink-0 ml-2 text-muted-foreground" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* User info header */}
              <div
                className="flex items-center gap-3 px-2 py-3 cursor-pointer"
                onClick={() => router.push(`/${role}/profile/${profileSlug}`)}
              >
                <SidebarAvatar
                  src={avatarSrc}
                  alt={avatarAlt}
                  displayName={displayName}
                  size="sm"
                />
                <p className="text-sm font-semibold text-foreground">
                  {displayName}
                </p>
              </div>

              <DropdownMenuSeparator />

              {/* Theme switcher */}
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <PaletteIcon className="w-4 h-4 mr-2" />
                    Theme
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-44">
                      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                      {(
                        [
                          { value: "light", label: "Light", Icon: Sun },
                          { value: "dark", label: "Dark", Icon: Moon },
                          {
                            value: "system",
                            label: "System",
                            Icon: MonitorIcon,
                          },
                        ] as const
                      ).map(({ value, label, Icon }) => (
                        <DropdownMenuItem
                          key={value}
                          onClick={() => setTheme(value)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                          {theme === value && (
                            <Check className="w-4 h-4 ml-auto text-primary" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
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
