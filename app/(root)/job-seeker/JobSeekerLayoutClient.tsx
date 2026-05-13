"use client";

import JobNavbar from "@/components/jobs/JobNavbar";
import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import { UserSubscription } from "@/types";
import { JobSeekerProfile } from "@/types/job-seeker";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function JobSeekerLayoutClient({
  children,
  seekerProfile,
  subscription,
}: {
  children: React.ReactNode;
  seekerProfile: JobSeekerProfile | null;
  subscription: UserSubscription | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const role = "job-seeker";

  const isJobs =
    pathname === `/${role}/jobs` ||
    /^\/job-seeker\/jobs\/[^/]+$/.test(pathname) ||
    pathname === `/${role}/ai/resume-matching` ||
    pathname === `/${role}/ai/matched-jobs`;

  const isInterviewDetail = /^\/job-seeker\/interviews\/[^/]+$/.test(pathname);

  if (isInterviewDetail) return <>{children}</>;

  return (
    <div className="flex h-screen bg-background">
      {!isJobs && (
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          role="job-seeker"
          seekerProfile={seekerProfile}
          employerProfile={null}
          subscription={subscription}
        />
      )}
      <div className="flex flex-col flex-1">
        {isJobs ? (
          <JobNavbar role="job-seeker" />
        ) : (
          <DashboardNavbar
            role="job-seeker"
            onMenuClick={() => setSidebarOpen((prev) => !prev)}
            isSidebarOpen={sidebarOpen}
          />
        )}
        <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
