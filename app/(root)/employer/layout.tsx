"use client";

import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isInterviewDetail = /^\/employer\/interviews\/[^/]+$/.test(pathname);

  if (isInterviewDetail) {
    return <>{children}</>;
  }

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
