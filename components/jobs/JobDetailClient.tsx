"use client";

import { useSeekerSimilerJobs } from "@/hooks/jobs/useSeekerJob";
import { useTrackJobView } from "@/hooks/profile-view/useViews";
import { useGetCurrentUserSubscription } from "@/hooks/stripe/useSubscripiton";
import { hasAccess } from "@/lib/utils";
import { Job } from "@/types/jobs";
import { useEffect } from "react";
import JobDetailContent from "../../app/(root)/job-seeker/jobs/[slug]/_components/JobDetailContent";
import HeaderCard from "../../app/(root)/job-seeker/jobs/[slug]/_components/JobHeader";
import JobSidebar from "../../app/(root)/job-seeker/jobs/[slug]/_components/JobSidebar";
import Loader from "../Loader";
import JobCard from "./JobCard";

const JobDetailClient = ({ job }: { job: Job }) => {
  const { data: similarJobs = [], isLoading } = useSeekerSimilerJobs(job.id);
  const { mutate: trackView } = useTrackJobView();
  const { data: subscription } = useGetCurrentUserSubscription();

  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );

  useEffect(() => {
    if (!job?.id) return;

    trackView(job.id);
  }, [job?.id]);

  if (isLoading) return <Loader mode="inline" />;
  return (
    <div className="space-y-6">
      {/* ── Header Card ───── */}

      <HeaderCard job={job} isSubscribed={isSubscribed} />
      {/* ── Main Grid ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <JobDetailContent job={job} />
        {/* Right Column */}
        <JobSidebar job={job} isSubscribed={isSubscribed} />
      </div>

      <div className="space-y-4">
        {similarJobs.length > 0 && (
          <h2 className="text-xl font-bold text-foreground">Similar Jobs</h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {similarJobs.length > 0 &&
            similarJobs.map((similarJob) => (
              <JobCard
                key={similarJob.id}
                job={similarJob}
                variant="similar"
                isSubscribed={isSubscribed}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetailClient;
