"use client";

import JobCard from "@/components/jobs/JobCard";
import JobCardSkeleton from "@/components/jobs/JobCardSkeleton";
import Loader from "@/components/Loader";
import { SALARY_RANGES } from "@/constants/jobsData";
import { useGetAllJobsForJobSeeker } from "@/hooks/useJobs";
import { useGetCurrentUserSubscription } from "@/hooks/useSubscripiton";
import { hasAccess } from "@/lib/utils";
import { JobFiltersType } from "@/types/jobs";
import { useState } from "react";

import JobTopBar from "./_components/JobTopBar";
import NoJobsFound from "./_components/NoJobsFound";
import Pagination from "./_components/Pagination";
import SearchAndFilterBar from "./_components/SearchAndFilterBar";

const BrowseJobs = () => {
  const { data: subscription } = useGetCurrentUserSubscription();

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
    sort: "all",
    featured: false,
  });

  const [salaryLabel, setSalaryLabel] = useState("");

  const {
    data = { jobs: [], totalCount: 0, totalPages: 0 },
    isLoading,
    isFetching,
  } = useGetAllJobsForJobSeeker(filters);

  const { jobs, totalCount, totalPages } = data;

  const featuredJobs = jobs.filter((job) => job.is_featured);
  const regularJobs = jobs.filter((job) => !job.is_featured);

  const updateFilters = (updated: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updated, page: 1 }));
  };

  const updateSalary = (label: string) => {
    setSalaryLabel(label);
    const selected = SALARY_RANGES.find((s) => s.label === label);
    updateFilters({ salaryMin: selected?.min, salaryMax: selected?.max });
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
      limit: 10,
      sort: "all",
    });
  };

  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );
  return (
    <div className="px-4 md:px-14 py-4 space-y-4">
      <div className="space-y-2">
        <h1 className="text-xl md:text-2xl font-bold">Find Your Dream Job</h1>

        <p className="text-sm text-muted-foreground">
          Browse {totalCount} jobs • {featuredJobs.length} featured
          opportunities
        </p>
      </div>

      <SearchAndFilterBar
        filters={filters}
        salaryLabel={salaryLabel}
        onFilterChange={updateFilters}
        onSalaryChange={updateSalary}
        onClear={clearFilters}
      />

      <JobTopBar
        totalCount={totalCount ?? 0}
        sort={filters.sort}
        onSortChange={(val) => updateFilters({ sort: val })}
        featuredCount={featuredJobs.length}
        featured={filters.featured}
        onFeaturedChange={(val) => updateFilters({ featured: val })}
      />

      {isLoading ? (
        <Loader mode="full" />
      ) : isFetching ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <NoJobsFound />
      ) : (
        <div className="space-y-6">
          {filters.featured && featuredJobs.length > 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <span className="inline-block w-0.5 h-3 bg-primary rounded-full" />
                Featured Opportunities
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {featuredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    variant="browse"
                    isSubscribed={isSubscribed}
                    featured
                  />
                ))}
              </div>
            </div>
          )}

          {/* ✅ Regular jobs — hidden when featured filter is on */}
          {!filters.featured && regularJobs.length > 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                All Jobs
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {regularJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    variant="browse"
                    isSubscribed={isSubscribed}
                    featured={job.is_featured}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Pagination
        page={filters.page ?? 1}
        totalPages={totalPages}
        onPageChange={(newPage) =>
          setFilters((prev) => ({ ...prev, page: newPage }))
        }
      />
    </div>
  );
};

export default BrowseJobs;
