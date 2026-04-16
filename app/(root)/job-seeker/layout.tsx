"use client";

import JobNavbar from "@/components/jobs/JobNavbar";
import Loader from "@/components/Loader";
import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import { useGetJobSeekerProfile } from "@/hooks/seeker-profile/useSeeker";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useGetJobSeekerProfile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isJobs =
    pathname === "/job-seeker/jobs" ||
    /^\/job-seeker\/jobs\/[^/]+$/.test(pathname);
  const isInterviewDetail = /^\/job-seeker\/interviews\/[^/]+$/.test(pathname);

  if (isInterviewDetail) {
    return <>{children}</>;
  }

  if (isLoading) return <Loader mode="full" />;
  return (
    <div className="flex h-screen bg-background">
      {!isJobs && (
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          role="job-seeker"
        />
      )}

      <div className="flex flex-col flex-1">
        {isJobs ? (
          <JobNavbar />
        ) : (
          <DashboardNavbar
            role="job-seeker"
            onMenuClick={() => setSidebarOpen((prev) => !prev)}
            isSidebarOpen={sidebarOpen}
          />
        )}

        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}
