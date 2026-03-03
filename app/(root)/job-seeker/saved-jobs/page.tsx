"use client";

import SavedJobCard from "@/components/jobs/SavedJobCard";
import { useGetCurrentUserSaveJobs } from "@/hooks/useJobs";
import { Bookmark } from "lucide-react";

const SavedJobsPage = () => {
  const { data: savedJobs, isLoading } = useGetCurrentUserSaveJobs();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Saved Jobs</h1>
          <p className="text-muted-foreground mt-2">
            {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {/* List */}
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {savedJobs.map((job) => (
              <SavedJobCard job={job} key={job.id} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
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
    </div>
  );
};

export default SavedJobsPage;
