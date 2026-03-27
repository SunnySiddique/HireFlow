"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllApplicants } from "@/hooks/useJobs";
import { exportToExcel } from "@/lib/utils/excel";
import { Download } from "lucide-react";
import { useState } from "react";
import ApplicantsSearchBar from "./_component/ApplicantsSearchBar";
import ApplicantsStatsCards from "./_component/ApplicantsStatsCards";
import ApplicantsTable from "./_component/ApplicantsTable";

const ApplicantsPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
  });
  const [activeTab, setActiveTab] = useState("active");
  const debouncedSearch = useDebounce(filters.search, 500);

  const { data: applicants, isLoading } = useGetAllApplicants();
  console.log("applicants:", applicants);
  const filteredApplicants = (applicants ?? []).filter((applicant) => {
    const search = debouncedSearch.toLowerCase();

    const searchFilter =
      applicant.seeker?.full_name?.toLowerCase().includes(search) ||
      applicant.job?.job_title?.toLowerCase().includes(search);

    const statusFilter =
      filters.status === "all" ||
      applicant.status?.toLowerCase() === filters.status.toLowerCase();

    const archivedFilter =
      activeTab === "active"
        ? !(applicant as any).archived
        : (applicant as any).archived;

    return searchFilter && statusFilter && archivedFilter;
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
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-3 sm:pb-4 md:pb-5 lg:pb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
          <ApplicantsSearchBar filters={filters} setFilters={setFilters} />

          <Button
            onClick={() => exportToExcel(filteredApplicants)}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-sm gap-2"
            disabled={filteredApplicants.length === 0}
          >
            <Download className="w-4 h-4" />
            <span className="sm:hidden md:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-4 sm:space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="active">Active Applicants</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4 sm:space-y-6">
              {/* Stats Cards */}
              <ApplicantsStatsCards applicants={filteredApplicants} />

              {/* Applicants Table */}
              <ApplicantsTable applicants={filteredApplicants} />
            </TabsContent>

            <TabsContent value="archived" className="space-y-4 sm:space-y-6">
              {/* Stats Cards */}
              <ApplicantsStatsCards applicants={filteredApplicants} />

              {/* Applicants Table */}
              <ApplicantsTable applicants={filteredApplicants} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;
