import { getSeekerSidebarData } from "@/lib/dashboard/getDashboardData";
import { UserSubscription } from "@/types";
import { JobSeekerProfile } from "@/types/job-seeker";
import JobSeekerLayoutClient from "./JobSeekerLayoutClient";

export default async function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { seekerProfile, subscription } = await getSeekerSidebarData();

  return (
    <JobSeekerLayoutClient
      seekerProfile={seekerProfile as JobSeekerProfile}
      subscription={subscription as UserSubscription}
    >
      {children}
    </JobSeekerLayoutClient>
  );
}
