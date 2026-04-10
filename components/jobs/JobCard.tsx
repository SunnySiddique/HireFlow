"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetCurrentUserSaveJobs, useSavedJob } from "@/hooks/useJobs";
import { formatLabel, formatSalary, getInitials } from "@/lib/utils";
import {
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface Employer {
  id: string;
  website: string;
  company_name: string;
  company_logo_url: string;
}

export interface Job {
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
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  employer: Employer;
}

interface JobCardProps {
  job: Job;
  variant?: "browse" | "similar";
  href?: string;
  isSubscribed: boolean;
  featured?: boolean;
}

const JobCard = ({
  job,
  variant = "browse",
  href,
  isSubscribed,
  featured = false,
}: JobCardProps) => {
  const { mutate: saveJob } = useSavedJob();
  const { data: savedJobs } = useGetCurrentUserSaveJobs();
  const isSaved = savedJobs?.some((s) => s.job_id === job.id);

  const detailHref = href ?? `/job-seeker/jobs/${job.job_slug}`;

  return (
    <Card
      className={`
      relative w-full rounded-xl border text-card-foreground overflow-hidden
      transition-all duration-300 ease-out group
      hover:-translate-y-0.5 hover:shadow-md
      ${
        featured
          ? "bg-gradient-to-br from-card via-card to-primary/5 border-primary/30 hover:border-primary/60"
          : "bg-card border-border hover:border-primary/50"
      }
    `}
    >
      {/* Animated top accent bar */}
      <div
        className={`
        absolute top-0 left-0 h-[2px] w-0 group-hover:w-full
        transition-all duration-500 ease-out
        ${featured ? "bg-gradient-to-r from-primary via-primary/70 to-primary" : "bg-primary"}
      `}
      />

      <div className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Avatar
              className={`h-10 w-10 flex-shrink-0 rounded-lg border ${featured ? "border-primary/30" : "border-border"}`}
            >
              <AvatarImage
                src={job.employer.company_logo_url}
                alt={job.employer.company_name}
                className="object-cover"
              />
              <AvatarFallback
                className={`rounded-lg text-xs font-bold ${featured ? "bg-primary/10 text-primary" : "bg-muted text-foreground"}`}
              >
                {getInitials(job.employer.company_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-snug truncate group-hover:text-primary transition-colors duration-200">
                {job.job_title}
              </h4>
              <a
                href={job.employer.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-primary transition-colors w-fit mt-0.5"
              >
                {job.employer.company_name}
                <ExternalLink className="h-2.5 w-2.5 ml-0.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Badges + Save */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {featured && (
              <Badge className="bg-primary/90 text-primary-foreground border border-primary/40 flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-sm">
                <Sparkles className="h-2.5 w-2.5" />
                Featured
              </Badge>
            )}
            {isSubscribed && (
              <Button
                size="sm"
                variant="outline"
                className={`h-7 w-7 p-0 transition-all duration-200 ${
                  isSaved
                    ? "border-primary/50 text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  saveJob(job.id);
                }}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-3.5 h-3.5" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        {variant === "browse" && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {job.job_description}
          </p>
        )}

        {/* Type badges */}
        <div className="flex flex-wrap gap-1.5">
          {[
            formatLabel(job.remote_option),
            formatLabel(job.employment_type),
            formatLabel(job.experience_level),
          ].map((label) => (
            <Badge
              key={label}
              className={`text-[10px] px-2 py-0.5 rounded-sm border capitalize ${
                featured
                  ? "bg-primary/10 text-primary border-primary/25"
                  : "bg-muted text-muted-foreground border-border"
              }`}
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
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm border ${
                featured
                  ? "bg-primary/5 text-primary border-primary/20"
                  : "bg-muted text-muted-foreground border-border"
              }`}
            >
              {skill.toUpperCase()}
            </span>
          ))}
          {job.skills_required.length > 4 && (
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-sm border ${featured ? "bg-primary/5 text-primary border-primary/20" : "bg-muted text-muted-foreground border-border"}`}
            >
              +{job.skills_required.length - 4}
            </span>
          )}
        </div>

        {/* Salary + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
              Salary / yr
            </p>
            <span
              className={`text-sm font-semibold ${featured ? "text-primary" : "text-foreground"}`}
            >
              {formatSalary(job.salary_min, job.salary_max, job.currency)}
            </span>
          </div>
          <Link href={detailHref} onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-7 px-3 rounded-lg flex items-center gap-1.5 group/btn"
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
