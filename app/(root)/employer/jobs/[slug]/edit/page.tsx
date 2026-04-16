import { getJobBySlug } from "@/lib/action/jobs/employer-jobs.actions";
import NoJobsFound from "../../../../../../components/jobs/NoJobsFound";
import CreateJobForm from "../../_components/CreateJobForm";
interface PageProps {
  params: Promise<{ slug: string }>;
}

const EditJobPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const result = await getJobBySlug(slug);

  if (!result) return <NoJobsFound isEmployer={true} />;
  return (
    <>
      <CreateJobForm fromType={"edit"} initialData={result} />
    </>
  );
};

export default EditJobPage;
