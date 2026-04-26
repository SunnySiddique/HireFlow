import { Button } from "@/components/ui/button";
import { useUpdateInterviewStatus } from "@/hooks/interview/useInterview";
import { useInterviewTimer } from "@/hooks/interview/useInterviewTimer";
import { cn } from "@/lib/utils";
import { Interview } from "@/types/interview";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  Clock,
  ExternalLink,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Hero = ({
  interview,
  role,
}: {
  interview: Interview;
  role: "employer" | "seeker";
}) => {
  const { mutate: updateInterviewStatus } = useUpdateInterviewStatus();
  const [actionState, setActionState] = useState<
    "idle" | "accepting" | "declining" | "accepted" | "declined"
  >("idle");

  const { formattedDate, formattedTime, isJoinAvailable, getRemainingLabel } =
    useInterviewTimer({
      id: interview.id,
      scheduled_at: interview.scheduled_at,
      status: interview.status,
    });

  const handleAcceptOrDecline = (isAccept: boolean) => {
    if (isAccept) {
      setActionState("accepting");
      updateInterviewStatus(
        {
          interviewerId: interview.interviewer_id as string,
          interviewId: interview.id,
          status: "accept",
        },
        {
          onSuccess: () => setActionState("accepted"),
          onError: () => setActionState("idle"),
        },
      );
    } else {
      setActionState("declining");
      updateInterviewStatus(
        {
          interviewerId: interview.interviewer_id as string,
          interviewId: interview.id,
          status: "decline",
        },
        {
          onSuccess: () => setActionState("declined"),
          onError: () => setActionState("idle"),
        },
      );
    }
  };

  return (
    <>
      <div className="bg-card rounded-3xl border border-border/50 p-6 sm:p-10 shadow-sm relative overflow-hidden mb-8">
        {interview.status === "upcoming" && (
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        )}

        {/* Pending Action Banner */}
        {role === "seeker" &&
          interview.status === "pending_confirm" &&
          actionState !== "accepted" &&
          actionState !== "declined" && (
            <div className="relative z-10 mb-8 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Action Required
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please accept or decline this interview request.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  disabled={
                    actionState === "declining" || actionState === "accepting"
                  }
                  className="w-full sm:w-auto border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                  onClick={() => handleAcceptOrDecline(false)}
                >
                  {actionState === "declining" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
                      Declining...
                    </span>
                  ) : (
                    "Decline"
                  )}
                </Button>
                <Button
                  disabled={
                    actionState === "accepting" || actionState === "declining"
                  }
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                  onClick={() => handleAcceptOrDecline(true)}
                >
                  {actionState === "accepting" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Accepting...
                    </span>
                  ) : (
                    "Accept Interview"
                  )}
                </Button>
              </div>
            </div>
          )}

        {interview.status === "cancelled" && (
          <div className="relative z-10 mb-8 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 sm:p-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                Interview Canceled
              </p>
              <p className="text-xs text-muted-foreground">
                This interview has been canceled and will no longer take place.
              </p>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between">
          <div className="flex gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-muted bg-card shadow-sm overflow-hidden shrink-0">
              <Image
                src={interview?.employer?.company_logo_url ?? "N/A"}
                alt={interview?.employer?.company_name ?? "N/A"}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col ">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-2">
                {interview?.applicant?.job.job_title ?? "N/A"}
              </h1>
              <p className="text-lg text-muted-foreground font-medium flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                {interview?.employer?.company_name ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col gap-4 bg-muted/30 p-5 rounded-2xl border border-border/50 min-w-[250px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Scheduled For
                </p>
                <p className="text-sm font-bold text-foreground">
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Time & Duration
                </p>
                <p className="text-sm font-bold text-foreground">
                  {formattedTime} • {interview.duration_minutes}m
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar for Upcoming */}
        {interview.status === "upcoming" && (
          <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
              {isJoinAvailable ? (
                <div className="flex items-center gap-2 text-emerald-500 font-semibold bg-emerald-500/10 px-4 py-2.5 rounded-lg border border-emerald-500/20 w-full sm:w-auto justify-center sm:justify-start">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Meeting is ready to join
                </div>
              ) : (
                <div className="flex flex-col items-end gap-1.5">
                  {!isJoinAvailable && (
                    <p className="text-xs text-muted-foreground text-right animate-pulse">
                      ⏳ Your join button will be ready in{" "}
                      <span className="font-bold font-mono text-primary dark:text-primary">
                        {getRemainingLabel()}
                      </span>{" "}
                      — it opens up 5 minutes before your interview 🎯
                    </p>
                  )}
                </div>
              )}
            </div>
            <Button
              className={cn(
                "w-full sm:w-auto rounded-xl font-bold px-8 h-12 transition-all duration-300 text-base",
                isJoinAvailable
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:scale-105"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-70",
              )}
              disabled={!isJoinAvailable}
              onClick={() =>
                window.open(interview?.meeting_link ?? "N/A", "_blank")
              }
            >
              Join Meeting <ExternalLink className="w-5 h-5 ml-2 shrink-0" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
