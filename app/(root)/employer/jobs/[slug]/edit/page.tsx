import { getJobPostBySlug } from "@/lib/action/jobs.actions";
import { notFound } from "next/navigation";
import CreateJobForm from "../../_components/CreateJobForm";
interface PageProps {
  params: Promise<{ slug: string }>;
}

const EditJobPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const result = await getJobPostBySlug(slug);

  if (!result) {
    notFound(); // renders your not-found.tsx or Next.js default 404 page
  }

  return (
    <>
      <CreateJobForm fromType={"edit"} initialData={result} />
    </>
  );
};

export default EditJobPage;
