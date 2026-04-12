"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useInterviewFilters } from "@/hooks/useInterviewFilters";
import { useGetCurrentUserAppliedJobs } from "@/hooks/useJobs";
import { cn } from "@/lib/utils";
import { applicantFiltersType } from "@/types/interview";
import { BriefcaseBusiness, Search, X } from "lucide-react";
import { useState } from "react";
import Pagination from "../jobs/_components/Pagination";
import ApplicationCard from "./_components/ApplicationCard";

const JobSeekerApplicationsPage = () => {
  const { filters, updateFilter, resetFilters } = useInterviewFilters();
  const [filter, setFilter] = useState<applicantFiltersType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearch = useDebounce(searchQuery, 500);
  const { data, isLoading } = useGetCurrentUserAppliedJobs({
    ...filters,
    search: debounceSearch,
  });
  const applications = data?.data ?? [];

  const totalPages = data?.totalPages ?? 0;
  const statuses = [
    "pending",
    "reviewing",
    "shortlisted",
    "rejected",
    "accepted",
  ];

  if (isLoading) return <Loader mode="inline" />;

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-5">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
            My Applications
          </h1>
          <p className="text-lg text-muted-foreground">
            Track and manage your {applications.length} submitted application
            {applications.length !== 1 ? "s" : ""}.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full  pl-11 pr-4 py-3 rounded-sm border border-border/50 bg-card text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 bg-card p-1.5 rounded-xl border border-border/50 shadow-sm overflow-x-auto hide-scrollbar w-full md:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap",
                filter === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              All
            </button>
            {statuses.map((f) => (
              <button
                key={f}
                onClick={() => {
                  updateFilter("status", f);
                  setFilter(f as applicantFiltersType);
                }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all whitespace-nowrap",
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applications.length > 0 ? (
            applications.map((app, index) => (
              <ApplicationCard key={app.id} app={app} index={index} />
            ))
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-card/50 rounded-3xl border border-dashed border-border">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center">
                  <BriefcaseBusiness className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                No applications found
              </h3>
              <p className="text-lg text-muted-foreground max-w-md mb-6">
                {filter !== "all" || searchQuery
                  ? "We couldn't find any applications matching your current filters."
                  : "Start applying to jobs and track your applications here."}
              </p>
              {(filter !== "all" || searchQuery) && (
                <Button
                  onClick={resetFilters}
                  className="rounded-xl font-bold px-8 h-12"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </div>

        <Pagination
          page={filters.page ?? 1}
          totalPages={totalPages}
          onPageChange={(newPage) => updateFilter("page", newPage)}
        />
      </div>
    </>
  );
};
export default JobSeekerApplicationsPage;
