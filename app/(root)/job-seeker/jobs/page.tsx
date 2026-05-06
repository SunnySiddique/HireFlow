"use client";

import JobCard from "@/components/jobs/JobCard";
import { SALARY_RANGES } from "@/constants/jobsData";
import { useGetCurrentUserSubscription } from "@/hooks/stripe/useSubscripiton";
import { hasAccess } from "@/lib/utils";
import { JobFiltersType } from "@/types/jobs";
import { useState } from "react";

import JobCardSkeleton from "@/components/jobs/JobCardSkeleton";
import Loader from "@/components/Loader";
import { useSeekerJobs } from "@/hooks/jobs/useSeekerJob";
import { useDebounce } from "@/hooks/useDebounce";
import JobTopBar from "./_components/JobTopBar";
import NoJobsFound from "./_components/NoJobsFound";
import Pagination from "./_components/Pagination";
import SearchAndFilterBar from "./_components/SearchAndFilterBar";

const BrowseJobs = () => {
  const { data: subscription } = useGetCurrentUserSubscription();

  const [filters, setFilters] = useState<JobFiltersType>({
    search: "",
    location: "",
    category: "all",
    employmentType: "all",
    experienceLevel: "all",
    salaryMin: undefined,
    salaryMax: undefined,
    page: 1,
    limit: 5,
    sort: "all",
    featured: false,
  });

  const [salaryLabel, setSalaryLabel] = useState("any");

  const debouncedSearch = useDebounce(filters.search, 400);
  const debouncedLocation = useDebounce(filters.location, 400);

  const isSearching = filters.search !== debouncedSearch;
  const isLocationSearching = filters.location !== debouncedLocation;

  const {
    data = { jobs: [], totalCount: 0, totalPages: 0 },
    isLoading,
    isFetching,
  } = useSeekerJobs({
    ...filters,
    search: debouncedSearch,
    location: debouncedLocation,
  });

  const { jobs, totalCount, totalPages } = data;

  const featuredJobs = jobs.filter((job) => job.is_featured);
  const regularJobs = jobs.filter((job) => !job.is_featured);

  const activeJobs = (() => {
    if (filters.featured) return featuredJobs;
    if (filters.sort !== "all") return jobs;

    return [...featuredJobs, ...regularJobs];
  })();

  const updateFilters = (updated: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updated, page: 1 }));
  };

  const updateSalary = (label: string) => {
    setSalaryLabel(label);
    if (label === "any") {
      updateFilters({ salaryMin: undefined, salaryMax: undefined });
      return;
    }
    const selected = SALARY_RANGES.find((s) => s.label === label);
    if (!selected) return;
    updateFilters({ salaryMin: selected.min, salaryMax: selected.max });
  };

  const clearFilters = () => {
    setSalaryLabel("any");
    setFilters({
      search: "",
      location: "",
      category: "all",
      employmentType: "all",
      experienceLevel: "all",
      salaryMin: undefined,
      salaryMax: undefined,
      page: 1,
      limit: 5,
      sort: "all",
      featured: false,
    });
  };
  console.log({
    totalCount,
    totalPages,
    page: filters.page,
    limit: filters.limit,
    jobsLength: jobs.length,
  });
  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );

  const showSkeleton = isFetching && !isLoading;

  if (isLoading) return <Loader mode="inline" />;
  return (
    <div className="space-y-4">
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
        isSearching={isSearching}
        isLocationSearching={isLocationSearching}
      />

      <JobTopBar
        totalCount={totalCount ?? 0}
        sort={filters.sort}
        onSortChange={(val) => updateFilters({ sort: val })}
        featuredCount={featuredJobs.length}
        featured={filters.featured}
        onFeaturedChange={(val) => updateFilters({ featured: val })}
      />

      {showSkeleton ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
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

          {!filters.featured && activeJobs.length > 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                All Jobs
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {activeJobs.map((job) => (
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
