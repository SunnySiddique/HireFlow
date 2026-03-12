"use client";

import Loader from "@/components/Loader";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllApplicants } from "@/hooks/useJobs";
import { useState } from "react";
import ApplicantsSearchBar from "./_component/ApplicantsSearchBar";
import ApplicantsStatsCards from "./_component/ApplicantsStatsCards";
import ApplicantsTable from "./_component/ApplicantsTable";

const ApplicantsPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
  });
  const debouncedSearch = useDebounce(filters.search, 500);

  const { data: applicants, isLoading } = useGetAllApplicants();

  const filteredApplicants = applicants?.filter((applicant) => {
    const search = debouncedSearch.toLowerCase();

    const searchFilter =
      applicant.seeker?.full_name?.toLowerCase().includes(search) ||
      applicant.job?.job_title?.toLowerCase().includes(search);

    const statusFilter =
      filters.status === "all" ||
      applicant.status?.toLowerCase() === filters.status.toLowerCase();

    return searchFilter && statusFilter;
  });

  if (isLoading) return <Loader />;

  return (
    <div className="flex-1 flex flex-col w-full min-w-0">
      {/* Page Header */}
      <div className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1">
            Applicants
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Manage and review job applications
          </p>
        </div>

        {/* Search and Filter Bar */}
        <ApplicantsSearchBar filters={filters} setFilters={setFilters} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-6">
          {/* Stats Cards */}
          <ApplicantsStatsCards applicants={applicants} />

          {/* Applicants Table */}
          <ApplicantsTable applicants={filteredApplicants} />
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;
