import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { getStatusBadge } from "@/constants/InterviewsData";
import { useJoinAvailable } from "@/hooks/useJoinAvailable";
import { Interview } from "@/types/interview";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import JobSeekerInterviewModalContent from "./JobSeekerInterviewModalContent";

const InterviewRow = ({ interview }: { interview: Interview }) => {
  const { isJoinAvailable } = useJoinAvailable(
    interview.id,
    interview.scheduled_at ?? "N/A",
  );
  const showJoinButton =
    interview.status === "upcoming" &&
    interview.meeting_link &&
    isJoinAvailable;

  return (
    <TableRow
      className={
        interview.status === "upcoming"
          ? "bg-primary/5 hover:bg-primary/10"
          : ""
      }
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={interview?.employer?.company_logo_url}
              alt={interview?.employer?.company_name}
            />
            <AvatarFallback>
              {interview?.employer?.company_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">
            {interview?.employer?.company_name || "N/A"}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <span className="font-medium text-sm">
            {interview.interviewer_name}
          </span>
          {interview.interviewer_title && (
            <div className="text-xs text-muted-foreground">
              {interview.interviewer_title}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="font-normal">
          {interview.interview_type}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {format(interview.scheduled_at ?? "N/A", "MMM d, yyyy hh:mm a")}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {interview.duration_minutes} mins
      </TableCell>
      <TableCell>{getStatusBadge(interview.status ?? "N/A")}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end items-center gap-2">
          {showJoinButton && (
            <Button
              size="sm"
              className="h-8"
              onClick={() =>
                window.open(interview.meeting_link ?? "N/A", "_blank")
              }
            >
              Join
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <JobSeekerInterviewModalContent interview={interview} />
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default InterviewRow;
