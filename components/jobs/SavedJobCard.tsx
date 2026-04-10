"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  formatDate,
  formatLabel,
  formatSalary,
  getInitials,
} from "@/lib/utils";
import { SavedJob } from "@/types/jobs";
import {
  Briefcase,
  CalendarDays,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
} from "lucide-react";

interface SavedJobCardProps {
  job: SavedJob;
  href?: string;
}

const statusStyle: Record<string, string> = {
  open: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800",
  closed: "bg-muted text-muted-foreground border-border",
  draft: "bg-muted text-muted-foreground border-border",
};

const SavedJobCard = ({ job, href }: SavedJobCardProps) => {
  return (
    <Card className="group p-0 border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Avatar className="h-11 w-11 flex-shrink-0 rounded-lg border border-border">
            <AvatarImage
              src={job.employer.company_logo_url}
              alt={job.employer.company_name}
              className="object-cover"
            />
            <AvatarFallback className="rounded-lg bg-muted text-foreground text-xs font-bold">
              {getInitials(job.employer.company_name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-2">
            <Badge
              className={`text-[10px] px-1.5 py-0 rounded-sm border capitalize ${statusStyle[job.status] ?? statusStyle.closed}`}
            >
              {job.status}
            </Badge>
          </div>
        </div>

        <div className="min-w-0">
          <h4 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors duration-200 mb-0.5">
            {job.job_title}
          </h4>
          <a
            href={job.employer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
          >
            {job.employer.company_name}
            <ExternalLink className="h-2.5 w-2.5 ml-0.5 opacity-60" />
          </a>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-primary/70 flex-shrink-0" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="h-3 w-3 text-primary/70 flex-shrink-0" />
            {formatLabel(job.employment_type)}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3 text-primary/70 flex-shrink-0" />
            Due {formatDate(job.application_deadline)}
          </span>
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
              Salary / yr
            </p>
            <span className="text-sm font-semibold text-foreground">
              {formatSalary(job.salary_min, job.salary_max, job.currency)}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="h-2.5 w-2.5" />
              Saved {formatDate(job.saved_at)}
            </span>
            <a
              href={href ?? `/job-seeker/jobs/${job.job_slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-7 px-2.5 rounded-lg flex items-center gap-1 group/btn"
              >
                View
                <ChevronRight className="h-3 w-3 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SavedJobCard;
