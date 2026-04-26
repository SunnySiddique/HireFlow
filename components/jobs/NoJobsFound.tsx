"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Plus } from "lucide-react";
import Link from "next/link";

const NoJobsFound = ({ isEmployer = true }: { isEmployer: boolean }) => {
  return (
    <div className="min-h-64 flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md text-center space-y-8 rounded-3xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Briefcase className="h-10 w-10" />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-foreground">
            No active jobs yet
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your employer dashboard is empty. Create your first job posting to
            start attracting candidates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {isEmployer && (
            <Link href="/employer/jobs/create" className="flex-1">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md font-semibold flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Create Job Posting
              </Button>
            </Link>
          )}
          <Link href="/browse-jobs" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-muted h-11 rounded-md font-semibold flex items-center justify-center gap-2"
            >
              Browse Jobs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoJobsFound;
