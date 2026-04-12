"use client";

import { Button } from "@/components/ui/button";
import { cn, formatDate, formatSalary } from "@/lib/utils";
import { randomImage } from "@/lib/utils/randomImage";
import { MappedAppliedJobType } from "@/types/jobs";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  MapPin,
  MessageSquare,
  Users,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const getAppStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return {
        color: "text-amber-600",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        icon: Clock,
        label: "Pending",
      };
    case "reviewing":
      return {
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        icon: Users,
        label: "Reviewing",
      };
    case "shortlisted":
      return {
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        icon: CheckCircle2,
        label: "Shortlisted",
      };
    case "rejected":
      return {
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        icon: XCircle,
        label: "Rejected",
      };
    case "accepted":
      return {
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        icon: CheckCircle2,
        label: "Accepted",
      };
    default:
      return {
        color: "text-muted-foreground",
        bg: "bg-muted",
        border: "border-border",
        icon: FileText,
        label: status,
      };
  }
};

const ApplicationCard = ({
  app,
  index,
}: {
  app: MappedAppliedJobType;
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusConfig = getAppStatusConfig(app.application_status ?? "pending");
  console.log(app);
  const PIPELINE = [
    { id: "pending", label: "Applied", color: "bg-amber-500" },
    { id: "reviewing", label: "Reviewing", color: "bg-blue-500" },
    { id: "shortlisted", label: "Shortlisted", color: "bg-purple-500" },
    { id: "accepted", label: "Offer", color: "bg-emerald-500" },
  ];

  const currentStageIndex = PIPELINE.findIndex(
    (p) => p.id === (app.application_status ?? "pending").toLowerCase(),
  );
  const isRejected =
    (app.application_status ?? "pending").toLowerCase() === "rejected";
  const activeColor =
    currentStageIndex >= 0 ? PIPELINE[currentStageIndex].color : "bg-muted";

  const hasExtraContent = app.cover_letter || app.employer_notes;

  return (
    <div
      className={cn(
        "bg-card/80 backdrop-blur-xl rounded-3xl border p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-500 group relative flex flex-col h-full",
        app.application_status === "shortlisted"
          ? "border-purple-500/30 hover:border-purple-500/50"
          : "border-border/50 hover:border-primary/30",
      )}
    >
      {/* Decorative background glow */}
      {app.application_status === "shortlisted" && (
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500" />
      )}
      {app.application_status === "accepted" && (
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
      )}

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header: Company & Job Status */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border-2 border-background bg-card shadow-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
              <Image
                src={
                  app?.employer?.company_logo_url ||
                  randomImage(app?.employer?.company_name ?? "N/A")
                }
                alt={app?.employer?.company_name ?? "N/A"}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                {app.job_title}
              </h3>
              <a
                href={app?.employer?.website ?? "N/A"}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-1 hover:text-primary transition-colors w-fit"
              >
                <Building2 className="w-4 h-4" />
                {app?.employer?.company_name ?? "N/A"}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm",
                statusConfig.bg,
                statusConfig.color,
                statusConfig.border,
              )}
            >
              <statusConfig.icon className="w-4 h-4" />
              {statusConfig.label}
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-x-5 gap-y-3 mb-6 bg-muted/30 p-4 rounded-2xl border border-border/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            {app.location}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            {formatSalary(
              app.salary_min as number,
              app.salary_max as number,
              app.currency as string,
            )}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
            {formatDate(app.applied_at as string)}
          </div>
        </div>

        {/* Progress Bar */}
        {!isRejected ? (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Application Progress
              </span>
            </div>
            <div className="relative h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(Math.max(0, currentStageIndex + 1) / PIPELINE.length) * 100}%`,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: index * 0.1 + 0.2,
                }}
                className={cn(
                  "absolute top-0 left-0 h-full rounded-full",
                  activeColor,
                )}
              />
            </div>
            <div className="flex justify-between mt-3 px-1">
              {PIPELINE.map((stage, i) => (
                <span
                  key={stage.id}
                  className={cn(
                    "text-[10px] sm:text-xs font-bold transition-colors duration-300",
                    i <= currentStageIndex
                      ? "text-foreground"
                      : "text-muted-foreground/50",
                  )}
                >
                  {stage.label}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <XCircle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-base font-bold text-rose-600">
                Application Rejected
              </p>
              <p className="text-sm text-rose-600/80 mt-1 leading-relaxed">
                The employer has decided to move forward with other candidates
                for this position.
              </p>
            </div>
          </div>
        )}

        {/* Expandable Notes / Cover Letter Snippet */}
        {hasExtraContent && (
          <div className="mb-6">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors mb-3"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              {isExpanded ? "Hide Details" : "View Application Details"}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pb-2">
                    {app.employer_notes && (
                      <div className="flex items-start gap-3 bg-blue-500/5 rounded-2xl p-4 border border-blue-500/10">
                        <MessageSquare className="w-5 h-5 text-blue-500/70 shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
                            Employer Note
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {app.employer_notes}
                          </p>
                        </div>
                      </div>
                    )}
                    {app.cover_letter && (
                      <div className="flex items-start gap-3 bg-muted/30 rounded-2xl p-4 border border-border/50">
                        <FileText className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs font-bold text-foreground mb-1 uppercase tracking-wider">
                            Cover Letter
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {app.cover_letter}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Skills */}
        {app.skills_required && app.skills_required.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {app.skills_required.map((skill: string) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-secondary/50 text-secondary-foreground text-xs font-bold border border-border/50 hover:bg-secondary transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Action Area */}
        <div className="pt-5 border-t border-border/50 flex justify-between items-center mt-auto">
          <div
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border",
              app.job_status === "open"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-muted text-muted-foreground border-border",
            )}
          >
            Job {app.job_status}
          </div>
          <Button
            className="rounded-xl font-bold px-6 h-10 text-sm transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 group/btn"
            onClick={() =>
              window.open(`/job-seeker/jobs/${app.job_slug}`, "_blank")
            }
          >
            View Job Details
            <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
