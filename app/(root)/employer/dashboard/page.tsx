"use client";

import JobListings from "./_components/JobListings";
import RecentApplicants from "./_components/RecentApplicants";
import StatsCard from "./_components/StatsCard";
import WeeklyApplicationsChart from "./_components/WeeklyApplicationsChart";

const EmployerDashboardPage = () => {
  return (
    <>
      <StatsCard />

      <JobListings />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8  mt-10">
        {/* Weekly Applications Chart */}
        <WeeklyApplicationsChart />
        <RecentApplicants />
      </div>
    </>
  );
};

export default EmployerDashboardPage;
