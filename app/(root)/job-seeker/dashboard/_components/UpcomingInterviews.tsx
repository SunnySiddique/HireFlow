import EmptyState from "@/components/EmptyState";
import InterviewCard from "@/components/interview/InterviewCard";
import { Interview } from "@/types/interview";
import { CalendarX } from "lucide-react";
import Link from "next/link";

const UpcomingInterviews = ({ interviews }: { interviews: Interview[] }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-base lg:text-lg font-bold text-foreground">
          Upcoming Interviews
        </h2>

        {interviews.length > 0 && (
          <Link
            href="/job-seeker/upcoming-interviews"
            className="text-primary hover:underline text-xs lg:text-sm font-medium"
          >
            View all →
          </Link>
        )}
      </div>

      <div className="space-y-3 lg:space-y-4">
        {interviews.length === 0 ? (
          <EmptyState icon={CalendarX} msg1="No upcoming interviews" msg2="" />
        ) : (
          interviews.map((interview) => (
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
