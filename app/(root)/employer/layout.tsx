import { getEmployerSidebarData } from "@/lib/dashboard/getDashboardData";
import { UserSubscription } from "@/types";
import EmployerLayoutClient from "./EmployerLayoutClient";

export default async function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { employerProfile, subscription } = await getEmployerSidebarData();

  return (
    <EmployerLayoutClient
      employerProfile={employerProfile}
      subscription={subscription as UserSubscription}
    >
      {children}
    </EmployerLayoutClient>
  );
}
