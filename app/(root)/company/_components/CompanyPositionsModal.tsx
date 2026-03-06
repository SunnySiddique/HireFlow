"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatDate, formatSalary } from "@/lib/utils";
import { Briefcase, Clock, MapPin, Search, X } from "lucide-react";
import { useState } from "react";

interface CompanyPositionsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  companyName: string;
  companyJobs: any;
}

const CompanyPositionsModal = ({
  isOpen,
  onOpenChange,
  companyName,
  companyJobs,
}: CompanyPositionsModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Filter jobs based on search and type
  const filteredJobs = companyJobs.filter((job) => {
    const matchesSearch = job.job_title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      activeFilter === job.employment_type.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: "all", label: "All Jobs" },
    { id: "remote", label: "Remote" },
    { id: "full_time", label: "Full-time" },
    { id: "contract", label: "Contract" },
    { id: "part_time", label: "Part-time" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Briefcase className="w-5 h-5 text-primary" />
            Open Positions at {companyName}
          </DialogTitle>
        </DialogHeader>

        {/* Search and Filters */}
        <div className="flex-shrink-0 space-y-4 pb-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="text-xs"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {companyJobs.length} positions
          </p>
        </div>

        {/* Jobs List - Scrollable */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground">
                No jobs found
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : selectedJob ? (
            // Job Detail View
            <div className="space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedJob(null)}
                className="mb-2"
              >
                <X className="w-4 h-4 mr-1" />
                Back to list
              </Button>

              <Card className="p-6 border-primary/30">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {selectedJob.job_title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {selectedJob.employment_type}
                      </span>
                      <span className="flex items-center gap-1">
                        {formatSalary(
                          selectedJob.salary_min,
                          selectedJob.salary_max,
                          selectedJob.currency,
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(selectedJob.created_at)}
                      </span>
                    </div>
                  </div>

                  {selectedJob.description && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Description
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedJob.description}
                      </p>
                    </div>
                  )}

                  {selectedJob.requirements && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Requirements
                      </h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button className="bg-primary hover:bg-primary/90 flex-1">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Save Job
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            // Jobs List View
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer group"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                      {job.job_title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {job.employment_type}
                      </span>
                      <span className="flex items-center gap-1">
                        {formatSalary(
                          job.salary_min,
                          job.salary_max,
                          job.currency,
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(job.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-shrink-0">
                    <Button
                      className="bg-primary hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyPositionsModal;
