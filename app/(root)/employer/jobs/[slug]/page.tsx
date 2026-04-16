import JobDetailClient from "@/components/jobs/JobDetailClient";
import { getJobBySlug } from "@/lib/action/jobs/employer-jobs.actions";
import { Job } from "@/types/jobs";
import NoJobsFound from "../../../../../components/jobs/NoJobsFound";

interface EmployerDetailViewPageProps {
  params: Promise<{ slug: string }>;
}

const EmployerDetailViewPage = async ({
  params,
}: EmployerDetailViewPageProps) => {
  const { slug } = await params;

  const jobPost = await getJobBySlug(slug);
  if (!jobPost) return <NoJobsFound isEmployer={true} />;
  return (
    <>
      <JobDetailClient job={jobPost as Job} />
    </>
  );
};

export default EmployerDetailViewPage;
