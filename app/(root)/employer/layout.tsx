import DashboardNavbar from "@/components/DashboardNavbar";
import { ReactNode } from "react";

const EmployerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DashboardNavbar role="employer" />
      {children}
    </>
  );
};

export default EmployerLayout;
