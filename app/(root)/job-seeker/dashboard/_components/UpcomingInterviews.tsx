import InterviewCard from "@/components/interview/InterviewCard";
import Loader from "@/components/Loader";
import { useUpcomingInterviews } from "@/hooks/interview/useInterview";
import Link from "next/link";

const UpcomingInterviews = () => {
  const { data: upcomingInterviews = [], isLoading } =
    useUpcomingInterviews(true);

  if (isLoading) return <Loader mode="inline" />;
  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-base lg:text-lg font-bold text-foreground">
          Upcoming Interviews
        </h2>

        <Link
          href="/job-seeker/upcoming-interviews"
          className="text-primary hover:underline text-xs lg:text-sm font-medium"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {upcomingInterviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No upcoming interviews
          </p>
        ) : (
          upcomingInterviews.map((interview) => (
            <InterviewCard
              role="seeker"
              interview={interview}
              key={interview.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingInterviews;
