import JobDetailClient from "@/components/jobs/JobDetailClient";
import { getJobPostBySlug } from "@/lib/action/jobs.actions";
import NoJobsFound from "../../../../../components/jobs/NoJobsFound";

interface EmployerDetailViewPageProps {
  params: Promise<{ slug: string }>;
}

const EmployerDetailViewPage = async ({
  params,
}: EmployerDetailViewPageProps) => {
  const { slug } = await params;

  const jobPost = await getJobPostBySlug(slug);

  if (!jobPost) return <NoJobsFound isEmployer={true} />;
  return (
    <>
      <JobDetailClient job={jobPost} />
    </>
  );
};

export default EmployerDetailViewPage;
