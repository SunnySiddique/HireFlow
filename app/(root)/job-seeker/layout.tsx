"use client";

import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isJobs = pathname === "/job-seeker/jobs";

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
        {isJobs && (
          <div className="bg-background border-b border-border px-4 lg:px-8 py-2 sticky top-0 z-50">
            <Link
              href="/job-seeker/dashboard"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
          </div>
        )}
        <DashboardNavbar
          role="job-seeker"
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          isSidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
