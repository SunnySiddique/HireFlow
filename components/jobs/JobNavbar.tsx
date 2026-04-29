"use client";

import { Button } from "@/components/ui/button";
import { useSeekerProfile } from "@/hooks/seeker-profile/useSeeker";
import { getInitials } from "@/lib/utils";
import { ArrowLeft, Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSignOut } from "@/hooks/auth/useAuth";
import { useEmployerProfile } from "@/hooks/employer-profile/useEmployer";
import { randomImage } from "@/lib/utils/randomImage";
import { useRouter } from "next/navigation";

const JobsNavbar = ({ role }: { role: "job-seeker" | "employer" }) => {
  const { data: seeker } = useSeekerProfile();
  const { data: employer } = useEmployerProfile();
  const { mutateAsync: signOut, isPending } = useSignOut();

  const userName =
    role === "job-seeker" ? seeker?.full_name : employer?.company_name;
  const userProfile =
    role === "job-seeker" ? seeker?.profile_url : employer?.company_logo_url;
  const userSlug = role === "job-seeker" ? seeker?.slug : employer?.slug;
  const router = useRouter();

  const redirectUrl =
    role === "job-seeker" ? "/job-seeker/dashboard" : "/employer/jobs";

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-14 h-14">
        {/* LEFT */}
        <Link href={redirectUrl}>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </Link>

        {/* CENTER */}
        <h1 className="text-sm font-semibold text-foreground">Browse Jobs</h1>

        {/* RIGHT (minimal avatar menu) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:opacity-80 transition">
              <Avatar className="h-8 w-8">
                {userProfile ? (
                  <AvatarImage
                    src={userProfile || randomImage(userName as string)}
                  />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(userName ?? "Jhon")}
                  </AvatarFallback>
                )}
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-2">
              <p className="text-sm font-medium">{userName ?? "Jhon"}</p>
              <p className="text-xs text-muted-foreground">
                {role === "job-seeker" ? "Job Seeker" : "Employer"}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/${role}/profile/${userSlug}`)}
            >
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={handleLogout}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging Out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default JobsNavbar;
