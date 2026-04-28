"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  Check,
  ExternalLink,
  LinkIcon,
  Loader,
  MessageSquare,
  Pencil,
  Trash2,
  User,
  Video,
} from "lucide-react";
import { Button } from "../ui/button";

import { getStatusConfig } from "@/constants/interveiwsData";
import { useDeleteInterview } from "@/hooks/interview/useInterview";
import { useInterviewTimer } from "@/hooks/interview/useInterviewTimer";
import { Interview } from "@/types/interview";
import { useState } from "react";
import EmployerInterviewModal from "../employer/interviews/EmployerInterviewModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const InterviewCard = ({
  interview,
  role,
}: {
  interview: Interview;
  role: "seeker" | "employer";
}) => {
  const { isJoinAvailable, getRemainingLabel, formattedDate, formattedTime } =
    useInterviewTimer(interview);
  const { mutate: deleteInterview, isPending } = useDeleteInterview();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCpy, setIsCpy] = useState(false);

  const statusConfig = getStatusConfig(interview.status);

  const handleCpy = () => {
    setIsCpy(true);
    navigator.clipboard.writeText(interview.meeting_link ?? "");

    setTimeout(() => {
      setIsCpy(false);
    }, 1000);
  };

  return (
    <div
      className={cn(
        "h-full bg-card/70 backdrop-blur-md rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden flex flex-col",
        interview.status === "upcoming"
          ? "border-primary/20 hover:border-primary/40 hover:bg-card/80"
          : "border-border/40 hover:bg-card/75",
      )}
    >
      {interview.status === "upcoming" && (
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Company & Job */}
        <div className="flex flex-col gap-3 mb-3 sm:mb-4">
          <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
            <Avatar className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl border-2 border-background shadow-sm shrink-0">
              <AvatarImage
                src={
                  role === "employer"
                    ? (interview.seeker?.profile_url ?? "")
                    : (interview?.employer?.company_logo_url ?? "")
                }
                alt={
                  role === "employer"
                    ? (interview.candidate_name ?? "Candidate")
                    : (interview?.employer?.company_name ?? "Company")
                }
                className="object-cover"
              />
              <AvatarFallback className="rounded-lg sm:rounded-xl bg-muted text-muted-foreground font-semibold text-xs sm:text-sm">
                {role === "employer"
                  ? (interview.candidate_name?.[0] ?? "C").toUpperCase()
                  : (
                      interview?.employer?.company_name?.[0] ?? "C"
                    ).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-foreground leading-tight truncate">
                {role === "employer"
                  ? interview.candidate_name
                  : interview?.applicant?.job.job_title}
              </h3>
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1 mt-1 truncate">
                {role === "employer" ? (
                  <>
                    <User className="w-3 h-3 shrink-0" />
                    <span className="truncate text-[10px] sm:text-xs">
                      For: {interview?.applicant?.job.job_title}
                    </span>
                  </>
                ) : (
                  <>
                    <Briefcase className="w-3 h-3 shrink-0" />
                    <span className="truncate">
                      {interview?.employer?.company_name}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div
              className={cn(
                "inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border",
                statusConfig.bg,
                statusConfig.color,
                statusConfig.border,
              )}
            >
              <statusConfig.icon className="w-3 h-3 shrink-0" />
              <span>{statusConfig.label}</span>
            </div>
            {role === "employer" && (
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors"
                  title="Copy Invite Link"
                  onClick={handleCpy}
                >
                  {isCpy ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                  title="Edit Interview"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteInterview({
                      interviewId: interview.id,
                      seekerId: interview.seeker_id ?? "",
                    });
                  }}
                  title="Delete Interview"
                >
                  {isPending ? (
                    <Loader className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 mb-3 sm:mb-4 bg-muted/40 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-border/30 flex-1">
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs md:text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Date & Time
                </p>
                <p className="text-xs sm:text-sm md:text-sm font-bold text-foreground truncate">
                  {formattedDate}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {formattedTime}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs md:text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Type & Duration
                </p>
                <p className="text-xs sm:text-sm md:text-sm font-bold text-foreground capitalize truncate">
                  {interview.interview_type} • {interview.duration_minutes}m
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs md:text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Interviewer
                </p>
                <p className="text-xs sm:text-sm md:text-sm font-bold text-foreground truncate">
                  {interview.interviewer_name}
                </p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground truncate">
                  {interview.interviewer_title}
                </p>
              </div>
            </div>
            {interview.message && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs md:text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                    Message
                  </p>
                  <p className="text-xs font-medium text-foreground italic line-clamp-2 leading-snug">
                    {`"${interview.message}"`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-border/30 mt-auto">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 xs:gap-2">
            {interview.status === "upcoming" ? (
              <div className="text-[10px] xs:text-xs sm:text-sm leading-tight">
                {isJoinAvailable ? (
                  <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                    <span className="relative flex h-2 w-2 xs:h-2.5 xs:w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500"></span>
                    </span>
                    <span className="hidden xs:inline">Ready to join</span>
                    <span className="xs:hidden">Ready</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 flex-wrap">
                    <AlertCircle className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Available in</span>
                    <span className="text-foreground font-bold bg-muted px-1.5 py-0.5 rounded">
                      {getRemainingLabel()}
                    </span>
                  </div>
                )}
              </div>
            ) : interview.status === "pending_confirm" ? (
              <div className="flex items-center gap-1 text-amber-500 font-semibold text-[10px] xs:text-xs sm:text-sm">
                <AlertCircle className="w-3 h-3 xs:w-3.5 xs:h-3.5 shrink-0" />
                <span>
                  {role === "employer"
                    ? "Awaiting response"
                    : "Action required"}
                </span>
              </div>
            ) : (
              <div className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground font-medium capitalize">
                {interview.status}
              </div>
            )}
          </div>

          <div className="flex gap-1.5 xs:gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1 xs:flex-none rounded-lg font-semibold px-2.5 xs:px-3 sm:px-4 h-7 xs:h-8 sm:h-9 text-[10px] xs:text-xs sm:text-sm transition-all"
              onClick={() =>
                (window.location.href = `/${role === "seeker" ? "job-seeker" : role}/interviews/${interview.id}`)
              }
            >
              <span className="hidden xs:inline">View Details</span>
              <span className="xs:hidden">View</span>
            </Button>

            {interview.status === "upcoming" && (
              <Button
                className={cn(
                  "flex-1 xs:flex-none rounded-lg font-semibold px-2.5 xs:px-3 sm:px-4 h-7 xs:h-8 sm:h-9 text-[10px] xs:text-xs sm:text-sm transition-all",
                  isJoinAvailable
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25 hover:scale-105"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-70",
                )}
                disabled={!isJoinAvailable}
                onClick={() =>
                  window.open(interview?.meeting_link ?? "https://", "_blank")
                }
              >
                <span className="flex items-center gap-1">
                  Join <ExternalLink className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
      {role === "employer" && (
        <EmployerInterviewModal
          isView={true}
          interview={interview}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          seekerId={interview?.seeker_id ?? ""}
          applicationId={interview?.application_id ?? ""}
        />
      )}
    </div>
  );
};

export default InterviewCard;
