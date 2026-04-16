"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getStatusBadge } from "@/constants/InterviewsData";
import { useUpdateInterviewStatus } from "@/hooks/interview/useInterview";
import { interviewTime } from "@/lib/utils";
import { Interview } from "@/types/interview";
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Loader2,
  MessageSquare,
  User,
  Video,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const JobSeekerInterviewModalContent = ({
  interview,
}: {
  interview: Interview;
}) => {
  const [isJoinAvailable, setIsJoinAvailable] = useState(false);
  const {
    mutate: updateInterviewStatus,
    isPending,
    variables,
  } = useUpdateInterviewStatus();

  const isAccepting = isPending && variables?.status === "accept";
  const isDeclining = isPending && variables?.status === "decline";

  useEffect(() => {
    if (!interview.scheduled_at) return;
    const check = () =>
      setIsJoinAvailable(interviewTime(interview.scheduled_at));
    check();
    const interval = setInterval(check, 60 * 1000);
    return () => clearInterval(interval);
  }, [interview.scheduled_at]);

  return (
    <DialogContent className="w-full max-w-lg rounded-xl p-0 overflow-hidden">
      {/* Header */}
      <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage
                src={interview?.employer?.company_logo_url}
                alt={interview?.employer?.company_name}
              />
              <AvatarFallback>
                {interview?.employer?.company_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <DialogTitle className="text-base truncate">
                {interview?.employer?.company_name || "Interview"}
              </DialogTitle>
              <p className="text-sm text-muted-foreground truncate">
                with {interview?.interviewer_name}
              </p>
            </div>
          </div>
          {getStatusBadge(interview.status)}
        </div>
      </DialogHeader>

      {/* Body */}
      <div className="px-6 py-4 space-y-5 max-h-[60vh] overflow-y-auto">
        {/* Core Details */}
        <div className="grid grid-cols-2 gap-3 bg-muted/50 p-4 rounded-lg border border-border">
          <div>
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Date & Time
            </div>
            <div className="text-sm font-medium">
              {formatDate(interview.scheduled_at)}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Duration
            </div>
            <div className="text-sm font-medium">
              {interview.duration_minutes} minutes
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
              <Video className="h-3.5 w-3.5" /> Type
            </div>
            <Badge variant="outline" className="font-normal text-xs">
              {interview.interview_type}
            </Badge>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> Status
            </div>
            {getStatusBadge(interview.status)}
          </div>
        </div>

        <Separator />

        {/* Interviewer */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback>
              {interview?.interviewer_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold">
              {interview?.interviewer_name}
            </div>
            {interview?.interviewer_title && (
              <div className="text-xs text-muted-foreground">
                {interview?.interviewer_title}
              </div>
            )}
          </div>
        </div>

        {/* Meeting Link */}
        {interview.meeting_link && (
          <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Meeting Link
            </div>
            <a
              href={interview.meeting_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-2 break-all"
            >
              {interview.meeting_link}
              <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
            </a>
            {interview.status === "upcoming" && isJoinAvailable && (
              <Button
                className="w-full mt-1"
                size="sm"
                onClick={() => window.open(interview.meeting_link!, "_blank")}
              >
                <Video className="h-4 w-4 mr-2" /> Join Meeting Now
              </Button>
            )}
          </div>
        )}

        {/* Message */}
        {interview.message && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" /> Message from Employer
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {interview.message}
            </div>
          </div>
        )}

        {/* Notes */}
        {interview.notes && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" /> Notes
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {interview.notes}
            </div>
          </div>
        )}

        {/* Feedback */}
        {interview.feedback && interview.status === "completed" && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-primary" /> Feedback
            </div>
            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {interview.feedback}
            </div>
          </div>
        )}

        {/* Status Message */}
        <div className="rounded-lg border border-border bg-muted/50 px-4 py-3 text-xs">
          {interview.status === "upcoming" && (
            <p className="text-blue-600 dark:text-blue-400">
              🎉 You're all confirmed! Your meeting link will appear right here
              5 minutes before the interview starts. Check back a little early
              and you're good to go! 🙌
            </p>
          )}
          {interview.status === "pending_confirm" && (
            <p className="text-amber-600 dark:text-amber-400">
              ⏳ The employer has sent you an interview invite. Please accept or
              decline it so they know your availability!
            </p>
          )}
          {interview.status === "completed" && (
            <p className="text-green-600 dark:text-green-400">
              ✅ Great job! This interview is completed. You can review the
              feedback shared by the interviewer above.
            </p>
          )}
          {interview.status === "cancelled" && (
            <p className="text-red-600 dark:text-red-400">
              😔 This interview was cancelled. Feel free to reach out to the
              employer if you have any questions.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <DialogFooter className="px-6 py-4 border-t border-border">
        {interview.status === "pending_confirm" ? (
          <div className="flex items-center justify-between w-full gap-3">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Close
              </Button>
            </DialogClose>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                disabled={isPending}
                onClick={() =>
                  updateInterviewStatus({
                    interviewId: interview.id,
                    status: "decline",
                    interviewerId: interview.interviewer_id,
                  })
                }
              >
                {isDeclining ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="mr-2 h-4 w-4" />
                )}
                Decline
              </Button>
              <Button
                size="sm"
                disabled={isPending}
                onClick={() =>
                  updateInterviewStatus({
                    interviewId: interview.id,
                    status: "accept",
                    interviewerId: interview.interviewer_id,
                  })
                }
              >
                {isAccepting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Accept
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center w-full gap-3">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Close
              </Button>
            </DialogClose>
            {interview.status === "upcoming" &&
              interview.meeting_link &&
              isJoinAvailable && (
                <Button
                  size="sm"
                  onClick={() => window.open(interview.meeting_link!, "_blank")}
                >
                  <Video className="h-4 w-4 mr-2" /> Join Now
                </Button>
              )}
          </div>
        )}
      </DialogFooter>
    </DialogContent>
  );
};

export default JobSeekerInterviewModalContent;
