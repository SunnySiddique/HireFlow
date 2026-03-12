"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetCurrentUserSaveJobs, useSavedJob } from "@/hooks/useJobs";
import {
  formatDate,
  formatLabel,
  formatSalary,
  getInitials,
  timeAgo,
} from "@/lib/utils";
import {
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Employer {
  id: string;
  website: string;
  description: string;
  company_name: string;
  company_logo_url: string;
}

interface Job {
  id: string;
  job_title: string;
  job_slug: string;
  employer_id: string;
  job_description: string;
  category: string;
  employment_type: string;
  experience_level: string;
  salary_min: number;
  salary_max: number;
  currency: string;
  location: string;
  remote_option: string;
  skills_required: string[];
  benefits: string[];
  application_deadline: string;
  open_positions: number;
  status: string;
  requirements: string[];
  created_at: string;
  updated_at: string;
  responsibilities: string[];
  employer: Employer;
}

interface JobCardProps {
  job: Job;
  variant?: "browse" | "similar";
  href?: string;
}


const statusStyle: Record<string, string> = {
  open: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800",
  closed: "bg-muted text-muted-foreground border-border",
  draft: "bg-muted text-muted-foreground border-border",
};

const JobCard = ({ job, variant = "browse", href }: JobCardProps) => {
  const { mutate: saveJob } = useSavedJob();
  const { data: savedJobs } = useGetCurrentUserSaveJobs();

  const isSaved = savedJobs?.some((save) => save.job_id === job.id);
  const [hovered, setHovered] = useState(false);

  const detailHref = href ?? `/job-seeker/jobs/${job.job_slug}`;

  const handleSaveJob = () => {
    saveJob(job.id);
  };

  return (
    <Card
      className="relative w-full border border-border rounded-xl bg-card text-card-foreground cursor-pointer select-none transition-all duration-300 ease-out hover:border-primary/60 hover:shadow-md hover:-translate-y-0.5 group overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 h-[2px] bg-primary transition-all duration-500 ease-out ${hovered ? "w-full" : "w-0"}`}
      />

      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
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
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-sm leading-snug truncate group-hover:text-primary transition-colors duration-200">
                {job.job_title}
              </h4>
              <a
                href={job.employer.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {job.employer.company_name}
                <ExternalLink className="h-2.5 w-2.5 ml-0.5 opacity-60" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {variant === "browse" && (
              <Badge
                className={`text-[10px] px-1.5 py-0 rounded-sm border capitalize bg-green-600/100 ${statusStyle[job.status] ?? statusStyle.draft}`}
              >
                {job.status}
              </Badge>
            )}
            <Button
              variant="outline"
              className={`border-border transition-all duration-200 ${isSaved ? "border-primary/50 text-primary bg-primary/5" : "text-foreground hover:bg-muted"}`}
              onClick={handleSaveJob}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Description — browse only, 2-line clamp */}
        {variant === "browse" && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {job.job_description}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          {[
            formatLabel(job.remote_option),
            formatLabel(job.employment_type),
            formatLabel(job.experience_level),
          ].map((label) => (
            <Badge
              key={label}
              className="text-[11px] px-2 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border capitalize"
            >
              {label}
            </Badge>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {job.skills_required.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border"
            >
              {skill.toLowerCase()}
            </span>
          ))}
          {job.skills_required.length > 4 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border">
              +{job.skills_required.length - 4}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 flex-shrink-0 text-primary/70" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3 w-3 flex-shrink-0 text-primary/70" />
            {job.open_positions} openings
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3 flex-shrink-0 text-primary/70" />
            Due {formatDate(job.application_deadline)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 flex-shrink-0 text-primary/70" />
            {timeAgo(job.created_at)}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Salary + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wide">
              Salary / yr
            </p>
            <span className="text-sm font-semibold text-foreground">
              {formatSalary(job.salary_min, job.salary_max, job.currency)}
            </span>
          </div>
          <Link href={detailHref} onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-8 px-3 rounded-lg flex items-center gap-1.5 group/btn"
            >
              {variant === "browse" ? "View Details" : "Apply Now"}
              <ChevronRight className="h-3 w-3 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
