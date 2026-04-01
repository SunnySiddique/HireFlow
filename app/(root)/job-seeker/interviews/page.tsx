"use client";

import InterviewHeader from "@/components/interview/InterviewHeader";
import Pagination from "@/components/pagination/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { useSeekerInterviews } from "@/hooks/useInterview";
import { useInterviewFilters } from "@/hooks/useInterviewFilters";
import { Calendar } from "lucide-react";
import JobSeekerInterviewTable from "./_components/JobSeekerInterviewTable";
import JobSeekerStatsCard from "./_components/JobSeekerStatsCard";

// Static mock data
const mockInterviews = [
  {
    id: "1",
    company: { name: "Acme Corp", logo: "https://i.pravatar.cc/150?u=acme" },
    jobTitle: "Frontend Engineer",
    type: "Technical",
    scheduledAt: "Apr 3, 2026 · 10:00 AM",
    duration: "45 min",
    status: "upcoming",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    interviewer: { name: "James Cho", title: "HR" },
    message: "Looking forward to discussing your background in React.",
  },
  {
    id: "2",
    company: { name: "NovaTech", logo: "https://i.pravatar.cc/150?u=nova" },
    jobTitle: "UI Developer",
    type: "Behavioral",
    scheduledAt: "Apr 6, 2026 · TBD",
    duration: "30 min",
    status: "pending_confirm",
    meetingLink: "https://zoom.us/j/123456789",
    interviewer: { name: "Priya Singh", title: "Tech Lead" },
    message: "Please let us know your availability.",
  },
  {
    id: "3",
    company: {
      name: "Pixel Studio",
      logo: "https://i.pravatar.cc/150?u=pixel",
    },
    jobTitle: "React Developer",
    type: "System Design",
    scheduledAt: "Mar 28, 2026 · 2:00 PM",
    duration: "60 min",
    status: "completed",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/...",
    interviewer: { name: "Dan Moore", title: "CTO" },
    message: "Great chatting with you.",
  },
  {
    id: "4",
    company: { name: "Loop Systems", logo: "https://i.pravatar.cc/150?u=loop" },
    jobTitle: "Full Stack Dev",
    type: "Initial Screen",
    scheduledAt: "Mar 25, 2026 · 11:00 AM",
    duration: "30 min",
    status: "cancelled",
    meetingLink: "",
    interviewer: { name: "Aisha Wang", title: "HR" },
    message: "We have decided to move forward with other candidates.",
  },
];

const JobSeekerInterviewsPage = () => {
  const { filters, queryFilters, updateFilter, resetFilters } =
    useInterviewFilters();

  // hooks
  const { data, isLoading } = useSeekerInterviews(queryFilters);

  const interviews = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleUpdateFilter = (key: string, value: string) => {
    updateFilter(key as keyof typeof filters, value);
  };

  const stats = {
    total: interviews.length,
    upcoming: interviews.filter((i) => i.status === "upcoming").length,
    pending_confirm: interviews.filter((i) => i.status === "pending_confirm")
      .length,
    completed: interviews.filter((i) => i.status === "completed").length,
    cancelled: interviews.filter((i) => i.status === "cancelled").length,
  };
  return (
    <div className="p-8">
      {/* Page Header */}
      <InterviewHeader
        totalInterviews={interviews.length}
        filters={filters}
        updateFilter={handleUpdateFilter}
        resetFilters={resetFilters}
      />

      {/* Stats Cards */}
      <JobSeekerStatsCard stats={stats} />

      {/* Interviews Table / Cards */}
      <Card className="border-border shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-12 text-center">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4 animate-pulse" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Loading interviews...
              </h3>
            </div>
          ) : interviews.length > 0 ? (
            <JobSeekerInterviewTable interviews={interviews} />
          ) : (
            <div className="py-12 text-center">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No interviews found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </CardContent>
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onNext={() => updateFilter("page", (filters?.page ?? 1) + 1)}
          onPrev={() => updateFilter("page", (filters?.page ?? 1) - 1)}
        />
      </Card>
    </div>
  );
};

export default JobSeekerInterviewsPage;
