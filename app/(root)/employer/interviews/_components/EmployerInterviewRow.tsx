import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { typeIcon, typeLabel } from "@/constants/InterviewsData";
import { Interview } from "@/types/interview";
import { Eye, Trash2 } from "lucide-react";

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

const EmployerInterviewRow = ({
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
    <TableRow className="border-border hover:bg-accent/40 transition-colors">
      <TableCell className="pl-5">
        <div className="flex items-center gap-3">
          <CandidateAvatar
            name={interview.interviewer_name}
            profileUrl={interview.seeker?.profile_url}
            size="sm"
          />
          <div>
            <p className="font-medium text-foreground text-sm">
              {interview.interviewer_name}
            </p>
            {interview.interviewer_title && (
              <p className="text-xs text-muted-foreground">
                {interview.interviewer_title}
              </p>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {interview.interviewer_title ?? "—"}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5 text-muted-foreground capitalize">
          {typeIcon(interview.interview_type)}
          <span className="text-sm">
            {typeLabel[interview.interview_type] ?? interview.interview_type}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-sm text-foreground">
        {new Date(interview.scheduled_at).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {interview.duration_minutes} mins
      </TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className={`text-xs font-medium rounded-full px-2.5 py-0.5 ${status.className}`}
        >
          {status.label}
        </Badge>
      </TableCell>
      <TableCell className="text-right pr-5">
        <div className="flex justify-end gap-1">
          {showJoinButton && (
            <Button
              size="sm"
              className="h-8"
              onClick={() => window.open(interview.meeting_link!, "_blank")}
            >
              Join
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView?.(interview)}
            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary rounded-lg"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteClick?.(interview)}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive rounded-lg"
            title="Delete"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmployerInterviewRow;
