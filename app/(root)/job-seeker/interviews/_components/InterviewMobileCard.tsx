"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getStatusBadge } from "@/constants/InterviewsData";
import { useJoinAvailable } from "@/hooks/useJoinAvailable";
import { Interview } from "@/types/interview";
import { format } from "date-fns";
import { Calendar, Clock, Eye } from "lucide-react";
import JobSeekerInterviewModalContent from "./JobSeekerInterviewModalContent";

const InterviewMobileCard = ({ interview }: { interview: Interview }) => {
  const { isJoinAvailable } = useJoinAvailable(
    interview.id,
    interview.scheduled_at ?? "N/A",
  );

  const showJoinButton =
    interview.status === "upcoming" &&
    interview.meeting_link &&
    isJoinAvailable;

  return (
    <div
      className={`p-4 space-y-4 ${interview.status === "upcoming" ? "bg-primary/5" : ""}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={interview?.employer?.company_logo_url}
              alt={interview?.employer?.company_name}
            />
            <AvatarFallback>
              {interview?.employer?.company_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">
              {interview?.employer?.company_name || "N/A"}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              By {interview.interviewer_name}
            </div>
            {interview.interviewer_title && (
              <div className="text-xs text-muted-foreground">
                {interview.interviewer_title}
              </div>
            )}
          </div>
        </div>
        {getStatusBadge(interview.status ?? "N/A")}
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-normal text-xs">
            {interview.interview_type}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {format(interview.scheduled_at ?? "N/A", "MMM d, yyyy hh:mm a")}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-4 w-4" />
          {interview.duration_minutes} minutes
        </div>
      </div>

      {interview.message && (
        <div className="bg-muted/30 p-2 rounded text-xs">
          <p className="text-muted-foreground">{interview.message}</p>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        {showJoinButton && (
          <Button
            size="sm"
            className="flex-1 text-xs h-8"
            onClick={() =>
              window.open(interview.meeting_link ?? "N/A", "_blank")
            }
          >
            Join Meeting
          </Button>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1 text-xs h-8">
              <Eye className="h-3.5 w-3.5 mr-2" /> View Details
            </Button>
          </DialogTrigger>
          <JobSeekerInterviewModalContent interview={interview} />
        </Dialog>
      </div>
    </div>
  );
};
export default InterviewMobileCard;
