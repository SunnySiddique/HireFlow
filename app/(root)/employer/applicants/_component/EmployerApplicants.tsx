"use client";

import Pagination from "@/app/(root)/job-seeker/jobs/_components/Pagination";
import Loader from "@/components/Loader";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { Button } from "@/components/ui/button";
import { useInterviewFilters } from "@/hooks/interview/useInterviewFilters";
import { useEmployerApplicants } from "@/hooks/jobs/useApplicants";
import { cn } from "@/lib/utils";
import { exportToExcel } from "@/lib/utils/excel";
import { applicantFiltersType } from "@/types/interview";
import { Download, Filter, Inbox } from "lucide-react";
import { useState } from "react";
import { ApplicantCard } from "./ApplicantCard";

const EmployerApplicants = () => {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

  const { filters, updateFilter, resetFilters } = useInterviewFilters();
  const { data, isLoading, isFetching } = useEmployerApplicants(filters);

  const filter = (filters.status as applicantFiltersType) ?? "all";

  const applicants = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleReset = () => {
    resetFilters();
  };

  const handleTabChange = (tab: "active" | "archived") => {
    setActiveTab(tab);
    updateFilter("archived", tab === "archived");
  };

  if (isLoading) return <Loader mode="inline" />;

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
              Applicants
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage and review job applications from candidates.
            </p>
          </div>

          <Button
            onClick={() => exportToExcel(applicants)}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-sm gap-2 rounded-xl h-11 px-6 font-bold"
            disabled={applicants.length === 0}
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>

        {/* Tabs & Filters */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 bg-card p-1.5 rounded-xl border border-border/50 shadow-sm">
            <button
              onClick={() => handleTabChange("active")}
              className={cn(
                "px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all",
                activeTab === "active"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              Active
            </button>
            <button
              onClick={() => handleTabChange("archived")}
              className={cn(
                "px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all",
                activeTab === "archived"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              Archived
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-card p-1.5 rounded-xl border border-border/50 shadow-sm">
            {[
              "all",
              "pending",
              "reviewing",
              "shortlisted",
              "rejected",
              "accepted",
            ].map((f) => (
              <button
                key={f}
                onClick={() => {
                  updateFilter("status", f);
                  updateFilter("page", 1);
                }}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all whitespace-nowrap",
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
            <button
              onClick={handleReset}
              className="px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all whitespace-nowrap text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Reset
            </button>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-6 transition-opacity duration-200",
            isFetching && "pointer-events-none",
          )}
        >
          {isFetching ? (
            <CardSkeleton rows={applicants.length} />
          ) : applicants.length > 0 ? (
            <div>
              {applicants.map((applicant) => (
                <ApplicantCard key={applicant.id} applicant={applicant} />
              ))}
            </div>
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-card/50 rounded-3xl border border-dashed border-border">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                {activeTab === "archived" ? (
                  <Inbox className="w-10 h-10 text-muted-foreground" />
                ) : (
                  <Filter className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                No applicants found
              </h3>
              <p className="text-lg text-muted-foreground max-w-md">
                {activeTab === "archived"
                  ? "You don't have any archived applicants."
                  : `You don't have any ${filter !== "all" ? filter : ""} applicants at the moment.`}
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
    </>
  );
};

export default EmployerApplicants;
