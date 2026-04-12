import InterviewDetailPage from "@/components/interview/InterviewDetailPage";

interface EmployerInterviewDetailPageProps {
  params: Promise<{ id: string }>;
}

const EmployerInterviewDetailPage = async ({
  params,
}: EmployerInterviewDetailPageProps) => {
  const { id } = await params;
  return <InterviewDetailPage interviewId={id} role="employer" />;
};

export default EmployerInterviewDetailPage;
