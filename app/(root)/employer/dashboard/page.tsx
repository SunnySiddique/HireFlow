"use client";

import UnSubscribeEmptyState from "@/components/UnSubscribeEmptyState";
import { useGetCurrentUserSubscription } from "@/hooks/useSubscripiton";
import { hasAccess } from "@/lib/utils";
import JobListings from "./_components/JobListings";
import RecentApplicants from "./_components/RecentApplicants";
import StatsCard from "./_components/StatsCard";
import WeeklyApplicationsChart from "./_components/WeeklyApplicationsChart";

const EmployerDashboardPage = () => {
  const { data: subscription } = useGetCurrentUserSubscription();
  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );

  return (
    <>
      <StatsCard />

      {isSubscribed ? (
        <>
          <JobListings />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8  mt-10">
            {/* Weekly Applications Chart */}
            <WeeklyApplicationsChart />
            <RecentApplicants />
          </div>
        </>
      ) : (
        <UnSubscribeEmptyState />
      )}
    </>
  );
};

export default EmployerDashboardPage;
