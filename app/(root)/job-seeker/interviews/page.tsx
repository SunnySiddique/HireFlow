"use client";

import InterviewCard from "@/components/interview/InterviewCard";
import InterviewHeader from "@/components/interview/InterviewHeader";
import Loader from "@/components/Loader";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { useInterviews } from "@/hooks/interview/useInterview";
import { useInterviewFilters } from "@/hooks/interview/useInterviewFilters";
import { Interview } from "@/types/interview";
import { Filter } from "lucide-react";
import Pagination from "../jobs/_components/Pagination";

const JobSeekerInterviewsPage = () => {
  const { filters, updateFilter, resetFilters } = useInterviewFilters();

  const { data, isLoading, isFetching } = useInterviews(filters, "seeker");

  const interviews = (data?.data ?? []) as Interview[];
  const totalPages = data?.totalPages ?? 0;

  if (isLoading) return <Loader mode="inline" />;
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/5">
      <div>
        <InterviewHeader
          resetFilters={resetFilters}
          updateFilter={updateFilter}
          filters={filters}
          role={"seeker"}
        />
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
          }
        >
          {isFetching && interviews.length === 0 ? (
            <CardSkeleton
              rows={4}
              className="lg:col-span-1"
              variant="interview"
            />
          ) : interviews.length > 0 ? (
            interviews.map((interview: Interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                role={"seeker"}
              />
            ))
          ) : (
            <div className="col-span-full py-16 sm:py-20 md:py-24 lg:py-28 flex flex-col items-center justify-center text-center bg-card/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-dashed border-border/30 px-4 sm:px-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                <Filter className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                No interviews found
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm">
                You {`don't`} have any{" "}
                {filters.status !== "all" ? filters.status : ""} interviews at
                the moment.
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
    </div>
  );
};

export default JobSeekerInterviewsPage;
