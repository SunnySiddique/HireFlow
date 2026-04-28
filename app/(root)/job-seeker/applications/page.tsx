"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useInterviewFilters } from "@/hooks/interview/useInterviewFilters";
import { useSeekerAppliedJobs } from "@/hooks/jobs/useSeekerJob";
import { cn } from "@/lib/utils";
import { BriefcaseBusiness } from "lucide-react";
import { useState } from "react";
import Pagination from "../jobs/_components/Pagination";
import ApplicationCard from "./_components/ApplicationCard";

const JobSeekerApplicationsPage = () => {
  const { filters, updateFilter, resetFilters } = useInterviewFilters();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading } = useSeekerAppliedJobs(filters);

  const applications = data?.jobs ?? [];
  const totalPages = data?.totalPages ?? 0;
  const activeStatus = filters.status ?? "all";

  const statuses = [
    "pending",
    "reviewing",
    "shortlisted",
    "rejected",
    "accepted",
  ];

  const handleToggleExpand = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  if (isLoading) return <Loader mode="inline" />;

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8 xl:mb-10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight text-foreground mb-2 sm:mb-3">
          My Applications
        </h1>
        <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground">
          Track and manage your{" "}
          <span className="font-semibold text-foreground">
            {applications.length}
          </span>{" "}
          submitted application{applications.length !== 1 ? "s" : ""}.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
        <div className="w-fit max-w-full overflow-x-auto scrollbar-hide">
          {" "}
          {/* ← add w-fit here */}
          <div className="flex flex-wrap md:flex-row items-center gap-1 sm:gap-1.5 bg-card p-1 sm:p-1.5 rounded-xl border border-border/50 shadow-sm">
            <button
              onClick={() => updateFilter("status", "all")}
              className={cn(
                "px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold capitalize transition-all whitespace-nowrap",
                activeStatus === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              All
            </button>
            {statuses.map((f) => (
              <button
                key={f}
                onClick={() => updateFilter("status", f)}
                className={cn(
                  "px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold capitalize transition-all whitespace-nowrap",
                  activeStatus === f
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 xl:gap-6 items-start">
        {applications.length > 0 ? (
          applications.map((app, index) => (
            <ApplicationCard
              key={app.id}
              app={app}
              index={index}
              isExpanded={expandedId === app.id}
              onToggleExpand={() => handleToggleExpand(app.id)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 sm:py-16 lg:py-20 xl:py-24 flex flex-col items-center justify-center text-center bg-card/50 rounded-2xl sm:rounded-3xl border border-dashed border-border px-4">
            <div className="relative mb-4 sm:mb-5 lg:mb-6">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center">
                <BriefcaseBusiness className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3">
              No applications found
            </h3>
            <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-muted-foreground max-w-xs sm:max-w-sm lg:max-w-md mb-4 sm:mb-5 lg:mb-6">
              {activeStatus !== "all"
                ? "We couldn't find any applications matching your current filters."
                : "Start applying to jobs and track your applications here."}
            </p>
            {activeStatus !== "all" && (
              <Button
                onClick={() => {
                  resetFilters();
                }}
                className="rounded-xl font-bold px-5 sm:px-6 lg:px-8 h-9 sm:h-10 lg:h-12 text-xs sm:text-sm lg:text-base"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 sm:mt-6 lg:mt-8">
          <Pagination
            page={filters.page ?? 1}
            totalPages={totalPages}
            onPageChange={(newPage) => updateFilter("page", newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default JobSeekerApplicationsPage;
