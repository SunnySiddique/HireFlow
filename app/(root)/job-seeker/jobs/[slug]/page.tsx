import NoJobsFound from "@/components/jobs/NoJobsFound";
import { getJobPostBySlug } from "@/lib/action/jobs.actions";
import JobDetailClient from "../../../../../components/jobs/JobDetailClient";

interface JobDetailsPageProps {
  params: Promise<{ slug: string }>;
}
//TODO after done the jobseeker detail page fix the employer job detail

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { slug } = await params;

  const job = await getJobPostBySlug(slug);

  if (!job) return <NoJobsFound isEmployer={false} />;
  return (
    <>
      <JobDetailClient job={job} />
    </>
  );
};

export default JobDetailsPage;
