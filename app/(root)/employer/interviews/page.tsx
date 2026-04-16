"use client";

import InterviewCard from "@/components/interview/InterviewCard";
import InterviewHeader from "@/components/interview/InterviewHeader";
import { useInterviews } from "@/hooks/interview/useInterview";
import { useInterviewFilters } from "@/hooks/interview/useInterviewFilters";
import { filtersType, Interview } from "@/types/interview";
import { Filter } from "lucide-react";
import { useState } from "react";
import Pagination from "../../job-seeker/jobs/_components/Pagination";

//TODO check the entier app from screatch and responsive

const EmployerInterviewsPage = () => {
  const { filters, updateFilter, resetFilters } = useInterviewFilters();
  const [filter, setFilter] = useState<filtersType>("all");

  const { data } = useInterviews(filters, "employer");

  const interviews = (data?.data ?? []) as Interview[];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <InterviewHeader
        resetFilters={resetFilters}
        updateFilter={updateFilter}
        filter={filter}
        setFilter={setFilter}
        role={"employer"}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {interviews.length > 0 ? (
          interviews.map((interview: Interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              role="employer"
            />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-card/50 rounded-3xl border border-dashed border-border">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No interviews found
            </h3>
            <p className="text-muted-foreground max-w-md">
              You {`don't`} have any {filter !== "all" ? filter : ""} interviews
              at the moment.
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
