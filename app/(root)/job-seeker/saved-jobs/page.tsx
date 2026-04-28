"use client";

import { SavedJobCard } from "@/components/jobs/SavedJobCard";
import Loader from "@/components/Loader";
import { useInterviewFilters } from "@/hooks/interview/useInterviewFilters";
import { useSavedJob, useSeekerSavedJobs } from "@/hooks/jobs/useSeekerJob";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import Pagination from "../jobs/_components/Pagination";
import Header from "./_components/Header";

const SavedJobsPage = () => {
  const { filters, updateFilter } = useInterviewFilters();

  const { data, isLoading } = useSeekerSavedJobs(filters);
  const { mutate: saveJob, isPending } = useSavedJob();

  const [activeJobId, setActiveJobId] = useState<string | null>(null);

  const savedJobs = data?.saved_jobs ?? [];

  const totalPages = data?.totalPages ?? 0;

  const handleSave = (jobId: string) => {
    setActiveJobId(jobId);

    saveJob(jobId, {
      onSettled: () => {
        setActiveJobId(null);
      },
    });
  };

  if (isLoading) return <Loader mode="inline" />;
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="space-y-8">
        {/* Header */}
        <Header
          jobs={savedJobs}
          filters={filters}
          updateFilter={updateFilter}
        />

        {/* List */}
        {(savedJobs ?? []).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {(savedJobs ?? []).map((job) => (
              <SavedJobCard
                job={job}
                key={job.id}
                onSave={handleSave}
                isSaving={isPending && activeJobId === job.job_id}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-6">
              <div className="relative w-24 h-24 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center">
                <Bookmark className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No saved jobs yet
            </h3>
            <p className="text-muted-foreground max-w-sm">
              Browse jobs and click the bookmark icon to save them here for
              later.
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

export default SavedJobsPage;
