"use client";

import InterviewHeader from "@/components/interview/InterviewHeader";
import Pagination from "@/components/pagination/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { useInterviews } from "@/hooks/useInterview";
import { useInterviewFilters } from "@/hooks/useInterviewFilters";
import { Calendar } from "lucide-react";
import JobSeekerInterviewTable from "./_components/JobSeekerInterviewTable";
import JobSeekerStatsCard from "./_components/JobSeekerStatsCard";

const JobSeekerInterviewsPage = () => {
  const { filters, queryFilters, updateFilter, resetFilters } =
    useInterviewFilters();

  // hooks
  const { data, isLoading } = useInterviews(queryFilters, "seeker");

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
