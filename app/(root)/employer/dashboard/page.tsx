"use client";

import Loader from "@/components/Loader";
import UnSubscribeEmptyState from "@/components/UnSubscribeEmptyState";
import {
  useActiveJobs,
  useChartApplicants,
  useRecentApplicants,
} from "@/hooks/jobs/useEmployerJobs";
import { useGetCurrentUserSubscription } from "@/hooks/stripe/useSubscripiton";
import { hasAccess } from "@/lib/utils";
import JobListings from "./_components/JobListings";
import RecentApplicants from "./_components/RecentApplicants";
import StatsCard from "./_components/StatsCard";
import WeeklyApplicationsChart from "./_components/WeeklyApplicationsChart";

const EmployerDashboardPage = () => {
  const { data: subscription, isLoading: subLoading } =
    useGetCurrentUserSubscription();
  const { data: jobListings = [], isLoading: jobsLoading } = useActiveJobs();
  const { data: chartData = [], isLoading: chartLoading } =
    useChartApplicants();
  const { data: recentApplicants = [], isLoading: applicantsLoading } =
    useRecentApplicants();

  if (subLoading) return <Loader mode="full" />;

  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );

  return (
    <>
      <StatsCard />

      {isSubscribed ? (
        <>
          {jobsLoading ? (
            <div className="animate-pulse h-40 bg-muted rounded-xl mt-6" />
          ) : (
            <JobListings jobs={jobListings} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-10">
            {chartLoading ? (
              <div className="animate-pulse h-64 bg-muted rounded-xl" />
            ) : (
              <WeeklyApplicationsChart chartData={chartData} />
            )}

            {applicantsLoading ? (
              <div className="animate-pulse h-64 bg-muted rounded-xl" />
            ) : (
              <RecentApplicants applicants={recentApplicants} />
            )}
          </div>
        </>
      ) : (
        <UnSubscribeEmptyState role="employer" />
      )}
    </>
  );
};

export default EmployerDashboardPage;
