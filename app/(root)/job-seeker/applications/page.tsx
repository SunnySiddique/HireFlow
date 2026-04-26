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

  const { data, isLoading } = useSeekerAppliedJobs();

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
    <div className="px-4 sm:px-6 lg:px-8 py-4 overflow-hidden">
      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground mb-2 sm:mb-3">
          My Applications
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
          Track and manage your{" "}
          <span className="font-semibold text-foreground">
            {applications.length}
          </span>{" "}
          submitted application{applications.length !== 1 ? "s" : ""}.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="w-fit max-w-full overflow-x-auto scrollbar-hide">
          {" "}
          {/* ← add w-fit here */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-card p-1.5 rounded-xl border border-border/50 shadow-sm">
            <button
              onClick={() => updateFilter("status", "all")}
              className={cn(
                "px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold capitalize transition-all whitespace-nowrap",
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
                  "px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold capitalize transition-all whitespace-nowrap",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-start">
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
          <div className="col-span-full py-16 sm:py-24 flex flex-col items-center justify-center text-center bg-card/50 rounded-2xl sm:rounded-3xl border border-dashed border-border px-4">
            <div className="relative mb-5 sm:mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center">
                <BriefcaseBusiness className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
              No applications found
            </h3>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-xs sm:max-w-md mb-5 sm:mb-6">
              {activeStatus !== "all"
                ? "We couldn't find any applications matching your current filters."
                : "Start applying to jobs and track your applications here."}
            </p>
            {activeStatus !== "all" && (
              <Button
                onClick={() => {
                  resetFilters();
                }}
                className="rounded-xl font-bold px-6 sm:px-8 h-10 sm:h-12 text-sm sm:text-base"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 sm:mt-8">
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
