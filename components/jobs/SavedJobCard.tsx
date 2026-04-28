"use client";

import { cn, formatDate, formatLabel, formatSalary } from "@/lib/utils";
import { SavedJob } from "@/types/jobs";
import {
  AlertCircle,
  BookmarkCheck,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  Loader,
  MapPin,
} from "lucide-react";

import { randomImage } from "@/lib/utils/randomImage";
import Image from "next/image";
import { Button } from "../ui/button";

const getStatusConfig = (status: string) => {
  switch ((status || "").toLowerCase()) {
    case "open":
      return {
        bg: "bg-emerald-500/10",
        color: "text-emerald-600",
        border: "border-emerald-500/20",
        label: "Actively Hiring",
        pulsing: true,
      };
    case "draft":
      return {
        bg: "bg-amber-500/10",
        color: "text-amber-600",
        border: "border-amber-500/20",
        label: "Draft",
        pulsing: false,
      };
    case "closed":
    default:
      return {
        bg: "bg-muted",
        color: "text-muted-foreground",
        border: "border-border",
        label: "Closed",
        pulsing: false,
      };
  }
};

export const SavedJobCard = ({
  job,
  onSave,
  isSaving,
}: {
  job: SavedJob;
  index?: number;
  onSave?: (id: string) => void;
  isSaving: boolean;
}) => {
  const statusConfig = getStatusConfig(job.status || "open");
  const isClosed = (job.status || "").toLowerCase() === "closed";

  return (
    <div
      className={cn(
        "bg-card/80 backdrop-blur-xl rounded-3xl border p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-500 group relative flex flex-col h-full",
        !isClosed
          ? "border-border/50 hover:border-primary/30"
          : "border-border/30 opacity-75 grayscale-[0.2]",
      )}
    >
      {/* Decorative Glow */}
      {!isClosed && (
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
      )}

      {onSave && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSave(job.job_id);
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-500/10 hover:text-rose-500  transition-all duration-300 z-20 group/unsave"
          aria-label="Remove from saved jobs"
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader className="h-3 w-3 animate-spin" />
          ) : (
            <BookmarkCheck className="w-3.5 h-3.5" />
          )}
        </Button>
      )}

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header: Logo, Company & Title */}
        <div className="flex items-start gap-4 mb-5 pr-10">
          <div className="w-14 h-14 rounded-2xl border-2 border-background bg-card shadow-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
            <Image
              src={
                job?.employer?.company_logo_url ||
                randomImage(job?.employer?.company_name || "C")
              }
              alt={job?.employer?.company_name || "Company Logo"}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {job?.job_title || "Untitled Job"}
            </h3>
            <a
              href={job?.employer?.website || "#"}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => !job?.employer?.website && e.preventDefault()}
              className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-1.5 hover:text-primary transition-colors w-fit"
            >
              <Building2 className="w-4 h-4" />
              {job?.employer?.company_name || "Unknown Company"}
              {job?.employer?.website && (
                <ExternalLink className="w-3 h-3 opacity-50" />
              )}
            </a>
          </div>
        </div>

        {/* Badges/Tags Row */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm",
              statusConfig.bg,
              statusConfig.color,
              statusConfig.border,
            )}
          >
            {statusConfig.pulsing && (
              <span className="relative flex h-2 w-2 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            {!statusConfig.pulsing && <AlertCircle className="w-3 h-3" />}
            {statusConfig.label}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary border border-border text-secondary-foreground shadow-sm">
            <Briefcase className="w-3.5 h-3.5" />
            {formatLabel(job?.employment_type ?? "full_time")}
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-muted/30 p-4 rounded-2xl border border-border/50">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Location
            </span>
            <span className="text-sm font-semibold text-foreground truncate">
              {job?.location || "Not specified"}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> Salary
            </span>
            <span className="text-sm font-semibold text-foreground truncate">
              {formatSalary(
                job?.salary_min as number,
                job?.salary_max as number,
                job?.currency as string,
              )}
            </span>
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2 mt-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold flex items-center gap-1">
              <CalendarDays className="w-3 h-3" /> Application Deadline
            </span>
            <span className="text-sm font-semibold text-foreground">
              {formatDate(job?.application_deadline as string)}
            </span>
          </div>
        </div>

        {/* Footer Area */}
        <div className="pt-5 border-t border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted py-1.5 px-3 rounded-lg border border-border">
            <Clock className="w-3.5 h-3.5" />
            Saved {formatDate(job?.saved_at)}
          </div>

          <Button
            className={cn(
              "w-full sm:w-auto rounded-xl font-bold px-6 h-10 text-sm transition-all duration-300 shadow-md group/btn",
              isClosed
                ? "bg-muted text-muted-foreground hover:bg-muted"
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20",
              !isClosed && "shadow-lg shadow-primary/30",
            )}
            disabled={isClosed}
            onClick={() => {
              if (!isClosed)
                window.open(`/seeker/jobs/${job?.job_slug}`, "_blank");
            }}
          >
            {isClosed ? "No Longer Accepting" : "View & Apply"}
            {!isClosed && (
              <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
