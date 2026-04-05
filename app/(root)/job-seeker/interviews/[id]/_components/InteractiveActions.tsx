import { Button } from "@/components/ui/button";
import { useUpdateInterviewStatus } from "@/hooks/useInterview";
import { interviewTime } from "@/lib/utils";
import { CheckCircle, Clock, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const InteractiveActions = ({
  status,
  meetingLink,
  interviewId,
  scheduledAt,
  interviewerId,
}: {
  status: "upcoming" | "pending_confirm" | "completed" | "cancelled";
  meetingLink: string;
  interviewId: string;
  scheduledAt: string;
  interviewerId: string;
}) => {
  const {
    mutate: updateInterviewStatus,
    isPending,
    variables,
  } = useUpdateInterviewStatus();

  const [isJoinAvailable, setIsJoinAvailable] = useState(false);

  const isAccepting = isPending && variables?.status === "accept";
  const isDeclining = isPending && variables?.status === "decline";

  useEffect(() => {
    if (!scheduledAt) return;

    const check = async () => {
      setIsJoinAvailable(interviewTime(scheduledAt));
    };

    check();
    const interval = setInterval(check, 60 * 1000);

    return () => clearInterval(interval);
  }, [scheduledAt]);

  return (
    <div className="pt-4 border-t border-border">
      {status === "pending_confirm" ? (
        <div className="space-y-4">
          <h3 className="text-base font-medium text-foreground">
            Are you available for this interview?
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              disabled={isPending}
              onClick={() =>
                updateInterviewStatus({
                  interviewId,
                  status: "accept",
                  interviewerId,
                })
              }
            >
              {isAccepting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Accept Interview
            </Button>
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              disabled={isPending}
              onClick={() =>
                updateInterviewStatus({
                  interviewId,
                  status: "decline",
                  interviewerId,
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
          </div>
        </div>
      ) : status === "upcoming" ? (
        <div className="flex items-start gap-2 bg-background border border-border rounded-lg px-4 py-3 mt-4">
          <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          {isJoinAvailable ? (
            <p className="text-sm text-muted-foreground">
              🎉 Your meeting link is ready! You can find it right here on this
              page or on your{" "}
              <Link
                href="/job-seeker/interviews"
                className="text-primary font-medium hover:underline"
              >
                Interviews page
              </Link>
              .{" "}
              <button
                onClick={() => window.open(meetingLink, "_blank")}
                className="text-primary font-medium hover:underline"
              >
                Join now →
              </button>{" "}
              Good luck!
            </p>
          ) : (
            <Link
              href="/job-seeker/interviews"
              className="text-sm text-muted-foreground"
            >
              No stress! Your meeting link will show up here and on your{" "}
              <span className="text-primary font-medium hover:underline">
                Interviews page
              </span>{" "}
              5 minutes before the interview starts. Just check back a little
              early and you're good to go! 🙌
            </Link>
          )}
        </div>
      ) : status === "completed" ? (
        <div className="bg-muted/40 border border-border rounded-xl p-6 text-center">
          <CheckCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-medium text-foreground mb-1">
            Interview Completed
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            This interview has been completed. Good luck!
          </p>
        </div>
      ) : (
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 text-center">
          <XCircle className="h-8 w-8 text-destructive/60 mx-auto mb-3" />
          <h3 className="font-medium text-foreground mb-1">
            Interview Declined
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            You have declined this interview invitation. We've notified the
            employer.
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveActions;
