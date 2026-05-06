"use client";

import JobsNavbar from "@/components/jobs/JobNavbar";
import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import { UserSubscription } from "@/types";
import { Employer } from "@/types/employer";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function EmployerLayoutClient({
  children,
  employerProfile,
  subscription,
}: {
  children: React.ReactNode;
  employerProfile: Employer | null;
  subscription: UserSubscription | null;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isInterviewDetail = /^\/employer\/interviews\/[^/]+$/.test(pathname);
  const isJobDetail =
    /^\/employer\/jobs\/[^/]+$/.test(pathname) ||
    /^\/employer\/jobs\/[^/]+\/edit$/.test(pathname);

  if (isInterviewDetail) return <>{children}</>;

  return (
    <div className="flex h-screen bg-background">
      {!isJobDetail && (
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          role="employer"
          employerProfile={employerProfile}
          seekerProfile={null}
          subscription={subscription}
        />
      )}
      <div className="flex flex-col flex-1">
        {isJobDetail ? (
          <JobsNavbar role="employer" isAiResume={false} />
        ) : (
          <DashboardNavbar
            role="employer"
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
