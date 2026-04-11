import JobDetailClient from "@/components/jobs/JobDetailClient";
import { getJobPostBySlug } from "@/lib/action/jobs.actions";
import { Job } from "@/types/jobs";
import NoJobsFound from "../../../../../components/jobs/NoJobsFound";

interface EmployerDetailViewPageProps {
  params: Promise<{ slug: string }>;
}

const EmployerDetailViewPage = async ({
  params,
}: EmployerDetailViewPageProps) => {
  const { slug } = await params;

  const jobPost = await getJobPostBySlug(slug);
  console.log(jobPost);
  if (!jobPost) return <NoJobsFound isEmployer={true} />;
  return (
    <>
      <JobDetailClient job={jobPost as Job} />
    </>
  );
};

export default EmployerDetailViewPage;
