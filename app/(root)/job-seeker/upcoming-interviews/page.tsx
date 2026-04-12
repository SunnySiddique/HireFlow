"use client";

import InterviewCard from "@/components/interview/InterviewCard";
import Loader from "@/components/Loader";
import { useUpcomingInterviews } from "@/hooks/useInterview";

const UpcomingInterviewsPage = () => {
  const { data: upcomingInterviews = [], isLoading } =
    useUpcomingInterviews(false);

  if (isLoading) return <Loader mode="inline" />;
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
          Upcoming Interviews
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage and join your scheduled interviews. Good luck!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6">
        {upcomingInterviews.map((interview) => (
          <InterviewCard
            key={interview.id}
            interview={interview}
            role="seeker"
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingInterviewsPage;
