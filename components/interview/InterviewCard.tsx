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

import { getStatusConfig } from "@/constants/InterviewsData";
import { useDeleteInterview } from "@/hooks/useInterview";
import { useInterviewTimer } from "@/hooks/useInterviewTimer";
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
        "bg-card/80 backdrop-blur-xl rounded-2xl border p-4 sm:p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden",
        interview.status === "upcoming"
          ? "border-primary/20 hover:border-primary/40"
          : "border-border/50",
      )}
    >
      {interview.status === "upcoming" && (
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
      )}

      <div className="relative z-10">
        {/* Header: Company & Job */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 rounded-xl border-2 border-background shadow-sm shrink-0">
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
              <AvatarFallback className="rounded-xl bg-muted text-muted-foreground font-semibold text-sm">
                {role === "employer"
                  ? (interview.candidate_name?.[0] ?? "C").toUpperCase()
                  : (
                      interview?.employer?.company_name?.[0] ?? "C"
                    ).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-bold text-foreground leading-tight">
                {role === "employer"
                  ? interview.candidate_name
                  : interview?.applicant?.job.job_title}
              </h3>
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                {role === "employer" ? (
                  <>
                    <User className="w-3.5 h-3.5" />
                    Applying for: {interview?.applicant?.job.job_title}
                  </>
                ) : (
                  <>
                    <Briefcase className="w-3.5 h-3.5" />
                    {interview?.employer?.company_name}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border",
                  statusConfig.bg,
                  statusConfig.color,
                  statusConfig.border,
                )}
              >
                <statusConfig.icon className="w-3.5 h-3.5" />
                {statusConfig.label}
              </div>
              {role === "employer" && (
                <div className="flex items-center gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-full"
                    title="Copy Invite Link"
                    onClick={handleCpy}
                  >
                    {isCpy ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <LinkIcon className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                    title="Edit Interview"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
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
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 bg-muted/30 p-3 sm:p-4 rounded-xl border border-border/50">
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Date & Time
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {formattedDate} at {formattedTime}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                <Video className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Type & Duration
                </p>
                <p className="text-sm font-semibold text-foreground capitalize">
                  {interview.interview_type} • {interview.duration_minutes} mins
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  {role === "employer" ? "Interviewer" : "Interviewer"}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {interview.interviewer_name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {interview.interviewer_title}
                </p>
              </div>
            </div>
            {interview.message && (
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Message
                  </p>
                  <p className="text-xs font-medium text-foreground italic line-clamp-1">
                    {`"${interview.message}"`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
          {interview.status === "upcoming" ? (
            <div className="flex items-center gap-1.5 text-xs">
              {isJoinAvailable ? (
                <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  Ready to join
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Available 5 mins before</span>
                  <span className="ml-1 text-foreground font-bold bg-muted px-1.5 py-0.5 rounded shrink-0">
                    {getRemainingLabel()}
                  </span>
                </div>
              )}
            </div>
          ) : interview.status === "pending_confirm" ? (
            <div className="flex items-center gap-1.5 text-amber-500 font-medium text-xs">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>
                {role === "employer"
                  ? "Awaiting candidate response"
                  : "Action required"}
              </span>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground font-medium">
              Interview {interview.status}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-lg font-bold px-4 h-9 text-sm transition-all duration-300"
              onClick={() =>
                (window.location.href = `/${role === "seeker" ? "job-seeker" : role}/interviews/${interview.id}`)
              }
            >
              View Details
            </Button>

            {interview.status === "upcoming" && (
              <Button
                className={cn(
                  "w-full sm:w-auto rounded-lg font-bold px-4 h-9 text-sm transition-all duration-300",
                  isJoinAvailable
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25 hover:scale-105"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-70",
                )}
                disabled={!isJoinAvailable}
                onClick={() =>
                  window.open(interview?.meeting_link ?? "https://", "_blank")
                }
              >
                Join <ExternalLink className="w-3.5 h-3.5 ml-1.5 shrink-0" />
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
