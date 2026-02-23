"use client";

import JobSeekerNavbar from "@/components/navbar/JobSeekerNavbar";
import JobSeekerSidebar from "@/components/sidebar/JobSeekerSidebar";
import { useState } from "react";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <JobSeekerSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-col flex-1">
        <JobSeekerNavbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
