import DashboardNavbar from "@/components/DashboardNavbar";
import { ReactNode } from "react";

export default function JobSeekerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardNavbar role="job_seeker" />
      <main>{children}</main>
    </>
  );
}
