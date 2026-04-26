"use client";

import Loader from "@/components/Loader";
import UnSubscribeEmptyState from "@/components/UnSubscribeEmptyState";
import { useUpcomingInterviews } from "@/hooks/interview/useInterview";
import {
  useGetRecentJobs,
  useRecommandedJobs,
} from "@/hooks/jobs/useSeekerJob";
import { useGetCurrentUserSubscription } from "@/hooks/stripe/useSubscripiton";
import { hasAccess } from "@/lib/utils";
import DashboardStats from "./_components/DashboardStats";
import ProfileCompletion from "./_components/ProfileCompletion";
import RecentApplications from "./_components/RecentApplications";
import RecommendedJobs from "./_components/RecommendedJobs";
import UpcomingInterviews from "./_components/UpcomingInterviews";

const JobSeekerDashboardPage = () => {
  const { data: subscription, isLoading: subLoading } =
    useGetCurrentUserSubscription();
  const { data: upcomingInterviews = [], isLoading: interviewsLoading } =
    useUpcomingInterviews(true);
  const { data: recentJobs = [], isLoading: recentJobsLoading } =
    useGetRecentJobs();
  const { data: recommendedJobs = [], isLoading: recommendedLoading } =
    useRecommandedJobs();

  const isLoading =
    subLoading || interviewsLoading || recentJobsLoading || recommendedLoading;
  if (isLoading) return <Loader mode="full" />;

  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );
  const isAcceleratorPlan =
    subscription?.plan?.toLowerCase() === "acccelerator" ||
    subscription?.plan?.toLowerCase() === "champion";
  return (
    <main className="p-8">
      {/* Stats Cards */}
      <section className="mb-6 lg:mb-8 ">
        <DashboardStats
          isSubscribed={isSubscribed}
          isAcceleratorPlan={isAcceleratorPlan}
        />
      </section>
      {isSubscribed ? (
        <>
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
            {/* Left Column - Applications & Interviews */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Upcoming Interviews */}
              <section>
                <UpcomingInterviews interviews={upcomingInterviews} />
              </section>

              {/* Recent Applications */}
              <section>
                <RecentApplications jobs={recentJobs} />
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6 lg:space-y-8">
              {/* Profile Completion */}
              <section>
                <ProfileCompletion />
              </section>
            </div>
          </div>

          {/* Recommended Jobs - Full Width */}
          <section>
            <RecommendedJobs jobs={recommendedJobs} />
          </section>
        </>
      ) : (
        <UnSubscribeEmptyState role="job-seeker" />
      )}
    </main>
  );
};

export default JobSeekerDashboardPage;
