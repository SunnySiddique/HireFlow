import UnSubscribeEmptyState from "@/components/UnSubscribeEmptyState";
import { getEmployerDashboardData } from "@/lib/dashboard/getDashboardData";
import { hasAccess } from "@/lib/utils";
import JobListings from "./_components/JobListings";
import RecentApplicants from "./_components/RecentApplicants";
import StatsCard from "./_components/StatsCard";
import WeeklyApplicationsChart from "./_components/WeeklyApplicationsChart";

const EmployerDashboardPage = async () => {
  const { subscription, jobs, chartData, recentApplicants, stats } =
    await getEmployerDashboardData();

  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );

  return (
    <>
      <StatsCard data={stats} />
      {isSubscribed ? (
        <>
          <JobListings jobs={jobs} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-10">
            <WeeklyApplicationsChart chartData={chartData} />
            <RecentApplicants applicants={recentApplicants} />
          </div>
        </>
      ) : (
        <UnSubscribeEmptyState role="employer" />
      )}
    </>
  );
};

export default EmployerDashboardPage;
