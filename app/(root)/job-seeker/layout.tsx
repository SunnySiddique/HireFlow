"use client";

import JobNavbar from "@/components/jobs/JobNavbar";
import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isJobs =
    pathname === "/job-seeker/jobs" ||
    /^\/job-seeker\/jobs\/[^/]+$/.test(pathname);
  const isInterviewDetail = /^\/job-seeker\/interviews\/[^/]+$/.test(pathname);

  if (isInterviewDetail) {
    return <>{children}</>;
  }

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

        <main className="flex-1 overflow-y-auto  px-4 py-6 lg:px-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
