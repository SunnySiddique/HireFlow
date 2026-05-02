import UnSubscribeEmptyState from "@/components/UnSubscribeEmptyState";
import { getSeekerDashboardData } from "@/lib/dashboard/getDashboardData";
import { hasAccess } from "@/lib/utils";
import DashboardStats from "./_components/DashboardStats";
import ProfileCompletion from "./_components/ProfileCompletion";
import RecentApplications from "./_components/RecentApplications";
import RecommendedJobs from "./_components/RecommendedJobs";
import UpcomingInterviews from "./_components/UpcomingInterviews";

const JobSeekerDashboardPage = async () => {
  const { subscription, interviews, recentJobs, recommendedJobs, stats } =
    await getSeekerDashboardData();

  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );

  const isAcceleratorPlan =
    subscription?.plan?.toLowerCase() === "acccelerator" ||
    subscription?.plan?.toLowerCase() === "champion";

  return (
    <main>
      <section className="mb-6 lg:mb-8">
        <DashboardStats
          data={stats ?? []}
          isSubscribed={isSubscribed}
          isAcceleratorPlan={isAcceleratorPlan}
        />
      </section>
      {isSubscribed ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <section>
                <UpcomingInterviews interviews={interviews ?? []} />
              </section>

              <section>
                <RecentApplications jobs={recentJobs} />
              </section>
            </div>

            <div className="space-y-6 lg:space-y-8">
              <section>
                <ProfileCompletion />
              </section>
            </div>
          </div>

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
