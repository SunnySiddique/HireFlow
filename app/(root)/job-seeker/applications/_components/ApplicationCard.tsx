"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface ApplicationCardProps {
  app: MappedAppliedJobType;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ApplicationCard = ({
  app,
  index,
  isExpanded,
  onToggleExpand,
}: ApplicationCardProps) => {
  const statusConfig = getAppStatusConfig(app.application_status ?? "pending");

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
        "bg-card/80 backdrop-blur-xl rounded-3xl border p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-xl transition-all duration-500 group relative flex flex-col",
        app.application_status === "shortlisted"
          ? "border-purple-500/30 hover:border-purple-500/50"
          : "border-border/50 hover:border-primary/30",
      )}
    >
      {app.application_status === "shortlisted" && (
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500" />
      )}
      {app.application_status === "accepted" && (
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
      )}

      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 sm:gap-4 mb-4 sm:mb-5">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-background bg-card shadow-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
              <Image
                src={
                  app?.employer?.company_logo_url ||
                  randomImage(app?.employer?.company_name ?? "")
                }
                alt={app?.employer?.company_name ?? ""}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors duration-300 truncate">
                {app.job_title}
              </h3>
              <a
                href={app?.employer?.website ?? ""}
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-sm text-muted-foreground font-medium flex items-center gap-1 mt-1 hover:text-primary transition-colors w-fit truncate"
              >
                <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="truncate">
                  {app?.employer?.company_name ?? ""}
                </span>
                <ExternalLink className="w-3 h-3 opacity-50 shrink-0" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div
              className={cn(
                "inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm",
                statusConfig.bg,
                statusConfig.color,
                statusConfig.border,
              )}
            >
              <statusConfig.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              {statusConfig.label}
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-2 sm:gap-y-3 mb-4 sm:mb-6 bg-muted/30 p-3 sm:p-4 rounded-2xl border border-border/50">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground min-w-0 flex-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            </div>
            <span className="truncate">{app.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground min-w-0 flex-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
            </div>
            <span className="truncate">
              {formatSalary(
                app.salary_min as number,
                app.salary_max as number,
                app.currency as string,
              )}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground min-w-0 flex-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            </div>
            <span className="truncate">
              {formatDate(app.applied_at as string)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        {!isRejected ? (
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Application Progress
              </span>
            </div>
            <div className="relative h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
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
            <div className="flex justify-between mt-2 sm:mt-3 px-1">
              {PIPELINE.map((stage, i) => (
                <span
                  key={stage.id}
                  className={cn(
                    "text-xs sm:text-sm font-bold transition-colors duration-300",
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
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-rose-600">
                Application Rejected
              </p>
              <p className="text-xs sm:text-sm text-rose-600/80 mt-1 leading-relaxed">
                The employer has decided to move forward with other candidates
                for this position.
              </p>
            </div>
          </div>
        )}

        {/* Expandable Details — controlled by parent via isExpanded/onToggleExpand */}
        {hasExtraContent && (
          <div className="mb-4 sm:mb-6">
            <button
              onClick={onToggleExpand} // ✅ delegate to parent, no local state
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors mb-3"
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
                  {app.employer_notes && app.cover_letter ? (
                    <Tabs defaultValue="employer-note" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-3">
                        <TabsTrigger
                          value="employer-note"
                          className="text-xs sm:text-sm"
                        >
                          Employer Note
                        </TabsTrigger>
                        <TabsTrigger
                          value="cover-letter"
                          className="text-xs sm:text-sm"
                        >
                          Cover Letter
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="employer-note" className="mt-0">
                        <div className="flex items-start gap-3 bg-blue-500/5 rounded-2xl p-3 sm:p-4 border border-blue-500/10">
                          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500/70 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
                              Employer Note
                            </span>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {app.employer_notes}
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="cover-letter" className="mt-0">
                        <div className="flex items-start gap-3 bg-muted/30 rounded-2xl p-3 sm:p-4 border border-border/50">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary/70 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-foreground mb-1 uppercase tracking-wider">
                              Cover Letter
                            </span>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                              {app.cover_letter}
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="space-y-3 pb-2">
                      {app.employer_notes && (
                        <div className="flex items-start gap-3 bg-blue-500/5 rounded-2xl p-3 sm:p-4 border border-blue-500/10">
                          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500/70 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
                              Employer Note
                            </span>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {app.employer_notes}
                            </p>
                          </div>
                        </div>
                      )}
                      {app.cover_letter && (
                        <div className="flex items-start gap-3 bg-muted/30 rounded-2xl p-3 sm:p-4 border border-border/50">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary/70 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-foreground mb-1 uppercase tracking-wider">
                              Cover Letter
                            </span>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                              {app.cover_letter}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Skills */}
        {app.skills_required && app.skills_required.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {app.skills_required.map((skill: string) => (
              <span
                key={skill}
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-secondary/50 text-secondary-foreground text-xs font-bold border border-border/50 hover:bg-secondary transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Action Area */}
        <div className="pt-4 sm:pt-5 border-t border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div
            className={cn(
              "text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md border",
              app.job_status === "open"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-muted text-muted-foreground border-border",
            )}
          >
            Job {app.job_status}
          </div>
          <Button
            className="rounded-xl font-bold px-4 sm:px-6 h-9 sm:h-10 text-xs sm:text-sm transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 group/btn w-full sm:w-auto"
            onClick={() =>
              window.open(`/job-seeker/jobs/${app.job_slug}`, "_blank")
            }
          >
            View Job Details
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
