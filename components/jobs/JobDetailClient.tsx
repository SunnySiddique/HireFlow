"use client";

import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useGetSimilarJobs } from "@/hooks/useJobs";
import { useTrackJobView } from "@/hooks/useViews";
import { Job } from "@/types/jobs";
import { useEffect } from "react";
import { AnimatedSection } from "../../app/(root)/job-seeker/jobs/[slug]/_components/animation";
import JobDetailContent from "../../app/(root)/job-seeker/jobs/[slug]/_components/JobDetailContent";
import HeaderCard from "../../app/(root)/job-seeker/jobs/[slug]/_components/JobHeader";
import JobSidebar from "../../app/(root)/job-seeker/jobs/[slug]/_components/JobSidebar";
import Loader from "../Loader";
import JobCard from "./JobCard";

const JobDetailClient = ({ job }: { job: Job }) => {
  const { data: similarJobs = [], isLoading } = useGetSimilarJobs(job.id);
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: trackView } = useTrackJobView();

  useEffect(() => {
    if (!job?.id) return;
    if (!currentUser) return;

    trackView(job.id);
    console.log("logded");
  }, [job?.id]);

  if (isLoading) return <Loader />;
  return (
    <div className="space-y-6">
      {/* ── Header Card ───── */}
      <HeaderCard job={job} />
      {/* ── Main Grid ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <JobDetailContent job={job} />
        {/* Right Column */}
        <JobSidebar job={job} />
      </div>

      <AnimatedSection delay={5}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Similar Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {similarJobs.map((similarJob) => (
              <JobCard key={similarJob.id} job={similarJob} variant="similar" />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default JobDetailClient;
