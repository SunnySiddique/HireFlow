"use client";

import EmployerNavbar from "@/components/navbar/EmployerNavbar";
import EmployerSidebar from "@/components/sidebar/EmployerSidebar";
import { useState } from "react";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <EmployerSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-col flex-1">
        <EmployerNavbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
