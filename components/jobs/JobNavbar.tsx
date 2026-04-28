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
import { useRouter } from "next/navigation";

const JobsNavbar = () => {
  const { data: seeker } = useSeekerProfile();
  const { mutateAsync: signOut, isPending } = useSignOut();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-14 h-14">
        {/* LEFT */}
        <Link href="/job-seeker/dashboard">
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
                {seeker?.profile_url ? (
                  <AvatarImage src={seeker.profile_url} />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(seeker?.full_name ?? "U")}
                  </AvatarFallback>
                )}
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-2">
              <p className="text-sm font-medium">
                {seeker?.full_name ?? "User"}
              </p>
              <p className="text-xs text-muted-foreground">Job Seeker</p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/job-seeker/profile/${seeker?.slug}`)}
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
