"use client";

import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import { useState } from "react";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        role="employer"
      />

      <div className="flex flex-col flex-1">
        <DashboardNavbar
          role="employer"
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
