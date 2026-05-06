"use client";

import InterviewCard from "@/components/interview/InterviewCard";
import InterviewHeader from "@/components/interview/InterviewHeader";
import Loader from "@/components/Loader";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { useInterviews } from "@/hooks/interview/useInterview";
import { useInterviewFilters } from "@/hooks/interview/useInterviewFilters";
import { cn } from "@/lib/utils";
import { Interview } from "@/types/interview";
import { Filter } from "lucide-react";
import Pagination from "../../job-seeker/jobs/_components/Pagination";

const EmployerInterviewsPage = () => {
  const { filters, updateFilter, resetFilters } = useInterviewFilters();

  const { data, isLoading, isFetching } = useInterviews(filters, "employer");

  const interviews = (data?.data ?? []) as Interview[];
  const totalPages = data?.totalPages ?? 0;

  if (isLoading) return <Loader mode="inline" />;
  return (
    <div>
      <InterviewHeader
        resetFilters={resetFilters}
        updateFilter={updateFilter}
        filters={filters}
        role={"employer"}
      />
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-200",
          isFetching && "pointer-events-none",
        )}
      >
        {isFetching && interviews.length === 0 ? (
          <CardSkeleton rows={6} variant="interview" />
        ) : interviews.length > 0 ? (
          <div
            className={cn(
              "contents transition-opacity duration-200",
              isFetching && "opacity-50",
            )}
          >
            {interviews.map((interview: Interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                role="employer"
              />
            ))}
          </div>
        ) : (
          // Empty state — only when settled and truly empty
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-card/50 rounded-3xl border border-dashed border-border">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No interviews found
            </h3>
            <p className="text-muted-foreground max-w-md">
              You don&apos;t have any{" "}
              {filters.status !== "all" ? filters.status : ""} interviews at the
              moment.
            </p>
          </div>
        )}
      </div>

      <Pagination
        page={filters.page ?? 1}
        totalPages={totalPages}
        onPageChange={(newPage) => updateFilter("page", newPage)}
      />
    </div>
  );
};

export default EmployerInterviewsPage;
