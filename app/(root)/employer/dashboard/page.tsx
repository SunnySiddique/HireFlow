import JobListings from "./_components/JobListings";
import QuickActions from "./_components/QuickActions";
import RecentApplicants from "./_components/RecentApplicants";
import StatsCard from "./_components/StatsCard";
import WeeklyApplicationsChart from "./_components/WeeklyApplicationsChart";

const EmployerDashboardPage = () => {
  return (
    <>
      <StatsCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <JobListings />
        <RecentApplicants />
      </div>
      {/* Quick Actions */}
      <QuickActions />

      {/* Weekly Applications Chart */}
      <WeeklyApplicationsChart />
    </>
  );
};

export default EmployerDashboardPage;
