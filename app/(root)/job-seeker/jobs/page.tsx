"use client";

import JobCard from "@/components/jobs/JobCard";
import JobCardSkeleton from "@/components/jobs/JobCardSkeleton";
import Loader from "@/components/Loader";
import { SALARY_RANGES } from "@/constants/jobsData";
import { useGetAllJobsForJobSeeker } from "@/hooks/useJobSeekerJobs";
import { JobFiltersType } from "@/types/jobs";
import { useState } from "react";
import JobFilters from "./_components/JobFilters";
import JobTopBar from "./_components/JobTopBar";
import NoJobsFound from "./_components/NoJobsFound";
import SearchAndFilterBar from "./_components/SearchAndFilterBar";

const BrowseJobs = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const [filters, setFilters] = useState<JobFiltersType>({
    search: "",
    location: "",
    category: "",
    employmentType: "",
    experienceLevel: "",
    salaryMin: undefined,
    salaryMax: undefined,
    page: 1,
    limit: 10,
    sort: "recent",
  });
  const [salaryLabel, setSalaryLabel] = useState("");

  const {
    data: { jobs, totalCount } = { jobs: [], totalCount: 0 },
    isLoading,
    isFetching,
  } = useGetAllJobsForJobSeeker(filters);

  const updateFilters = (updated: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updated, page: 1 }));
  };

  const updateSalary = (label: string) => {
    setSalaryLabel(label);
    const selected = SALARY_RANGES.find((s) => s.label === label);
    updateFilters({
      salaryMin: selected?.min,
      salaryMax: selected?.max,
    });
  };

  const clearFilters = () => {
    setSalaryLabel("");
    setFilters({
      search: "",
      location: "",
      category: "",
      employmentType: "",
      experienceLevel: "",
      salaryMin: undefined,
      salaryMax: undefined,
      page: 1,
    });
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Search & Filter Bar */}
      <SearchAndFilterBar
        filters={filters}
        salaryLabel={salaryLabel}
        onFilterChange={updateFilters}
        onSalaryChange={updateSalary}
        onClear={clearFilters}
      />

      {/* Main Grid */}

      <div className="flex-1 flex flex-col">
        {/* Sidebar Filters */}
        <div className="flex-1 px-4 lg:px-8 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="hidden lg:block">
              <JobFilters
                filters={filters}
                salaryLabel={salaryLabel}
                onFilterChange={updateFilters}
                onSalaryChange={updateSalary}
                onClear={clearFilters}
              />
            </aside>

            {/* Jobs Grid */}
            <div className="flex-1">
              <JobTopBar
                totalCount={totalCount ?? 0}
                sort={filters.sort}
                onSortChange={(val) => updateFilters({ sort: val })}
                setViewMode={setViewMode}
              />
              {isLoading ? (
                <Loader />
              ) : isFetching ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 lg:grid-cols-3 gap-5"
                      : "flex flex-col"
                  }
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <JobCardSkeleton key={i} />
                  ))}
                </div>
              ) : jobs.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 "
                      : "flex flex-col gap-5"
                  }
                >
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} variant="browse" />
                  ))}
                </div>
              ) : (
                <NoJobsFound />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
