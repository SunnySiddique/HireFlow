"use client";

import DashboardQuickActions from "./_components/DashboardQuickActions";
import DashboardStats from "./_components/DashboardStats";
import ProfileCompletion from "./_components/ProfileCompletion";
import RecentApplications from "./_components/RecentApplications";
import RecommendedJobs from "./_components/RecommendedJobs";

const JobSeekerDashboardPage = () => {
  return (
    <>
      {/* Stats Cards */}
      <section className="mb-6 lg:mb-8">
        <DashboardStats />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
        {/* Left Column - Applications & Interviews */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Recent Applications */}
          <section>
            <RecentApplications />
          </section>

          {/* Upcoming Interviews */}
          {/* <section>
            <UpcomingInterviews />
          </section> */}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6 lg:space-y-8">
          {/* Profile Completion */}
          <section>
            <ProfileCompletion />
          </section>

          {/* Quick Actions */}
          <section>
            <DashboardQuickActions />
          </section>
        </div>
      </div>

      {/* Recommended Jobs - Full Width */}
      <section>
        <RecommendedJobs />
      </section>
    </>
  );
};

export default JobSeekerDashboardPage;
