import { getJobPostBySlug } from "@/lib/action/jobs.actions";
import JobDetailsPage from "../../../../../components/jobs/JobDetail";
import NoJobsFound from "../_components/NoJobsFound";

interface EmployerDetailViewPageProps {
  params: Promise<{ slug: string }>;
}

const EmployerDetailViewPage = async ({
  params,
}: EmployerDetailViewPageProps) => {
  const { slug } = await params;

  const jobPost = await getJobPostBySlug(slug);

  if (!jobPost) return <NoJobsFound />;
  return (
    <>
      <JobDetailsPage role="employer" jobPost={jobPost} />
    </>
  );
};

export default EmployerDetailViewPage;
