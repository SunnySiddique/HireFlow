import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { typeIcon } from "@/constants/InterviewsData";
import { Interview } from "@/types/interview";
import { Eye, Trash2 } from "lucide-react";
import CandidateAvatar from "./CandidateAvatar";

const statusConfig: Record<string, { label: string; className: string }> = {
  upcoming: {
    label: "Upcoming",
    className: "bg-secondary/15 text-secondary border border-secondary/20",
  },
  pending_confirm: {
    label: "Pending",
    className: "bg-chart-3/40 text-chart-2 border border-chart-3/30",
  },
  completed: {
    label: "Completed",
    className: "bg-chart-1/20 text-chart-1 border border-chart-1/20",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-destructive/10 text-destructive border border-destructive/20",
  },
};

const EmployerInterviewMobileCard = ({
  interview,
  onView,
  onDeleteClick,
  isDeleting,
  isJoinAvailable,
}: {
  interview: Interview;
  onView?: (interview: Interview) => void;
  onDeleteClick?: (interview: Interview) => void;
  isDeleting: boolean;
  isJoinAvailable: boolean;
}) => {
  const status = statusConfig[interview.status] ?? {
    label: interview.status,
    className: "",
  };

  const showJoinButton =
    interview.status === "upcoming" &&
    interview.meeting_link &&
    isJoinAvailable;

  return (
    <div className="bg-card border border-border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-3 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <CandidateAvatar
            name={interview.interviewer_name}
            profileUrl={interview.seeker?.profile_url ?? "N/A"}
            size="md"
          />
          <div>
            <p className="font-medium text-foreground text-sm">
              {interview.interviewer_name}
            </p>
            <div className="flex items-center gap-1 text-muted-foreground mt-0.5">
              {typeIcon(interview.interview_type)}
              <span className="text-xs capitalize">
                {interview.interview_type}
              </span>
            </div>
          </div>
        </div>
        <Badge
          variant="secondary"
          className={`text-xs font-medium rounded-full px-2.5 py-0.5 ${status.className}`}
        >
          {status.label}
        </Badge>
      </div>

      {interview.interviewer_title && (
        <p className="text-xs text-muted-foreground -mt-1">
          {interview.interviewer_title}
        </p>
      )}

      {interview.message && (
        <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 line-clamp-2">
          {interview.message}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
        <span>
          {new Date(interview.scheduled_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
          {" · "}
          {interview.duration_minutes} mins
        </span>
        <div className="flex gap-1 items-center">
          {showJoinButton && (
            <Button
              size="sm"
              className="h-7 text-xs px-3"
              onClick={() => window.open(interview.meeting_link!, "_blank")}
            >
              Join
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView?.(interview)}
            className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary rounded-lg"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteClick?.(interview)}
            className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive rounded-lg"
            disabled={isDeleting}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployerInterviewMobileCard;
