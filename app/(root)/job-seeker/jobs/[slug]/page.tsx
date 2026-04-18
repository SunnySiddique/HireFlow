import NoJobsFound from "@/components/jobs/NoJobsFound";
import { getJobBySlugService } from "@/lib/services/jobs/employer-job.service";
import JobDetailClient from "../../../../../components/jobs/JobDetailClient";

interface JobDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { slug } = await params;

  const job = await getJobBySlugService(slug);

  if (!job) return <NoJobsFound isEmployer={false} />;
  return (
    <>
      <JobDetailClient job={job} />
    </>
  );
};

export default JobDetailsPage;
