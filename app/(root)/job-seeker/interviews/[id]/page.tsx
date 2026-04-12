import InterviewDetailPage from "@/components/interview/InterviewDetailPage";

interface JobSeekerInterviewDetailPageProps {
  params: Promise<{ id: string }>;
}

const JobSeekerInterviewDetailPage = async ({
  params,
}: JobSeekerInterviewDetailPageProps) => {
  const { id } = await params;
  return <InterviewDetailPage interviewId={id} role="seeker" />;
};

export default JobSeekerInterviewDetailPage;
