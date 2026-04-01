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
import { Interview } from "@/types/interview";
import {
  Award,
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  MessageSquare,
  User,
  Video,
} from "lucide-react";

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
  return (
    <>
      <DialogContent className="max-w-2xl max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto sm:rounded-xl w-full h-full sm:h-auto border-0 sm:border">
        <DialogHeader className="border-b border-border pb-4">
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
                <DialogTitle className="text-lg truncate">
                  {interview?.employer?.company_name || "Interview"}
                </DialogTitle>
                <p className="text-sm text-muted-foreground truncate">
                  {interview?.interviewer_name}
                </p>
              </div>
            </div>
            {getStatusBadge(interview.status)}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Interview Core Details */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Interview Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg border border-border">
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Scheduled Date & Time
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
                  <Video className="h-3.5 w-3.5" /> Interview Type
                </div>
                <div className="text-sm font-medium">
                  <Badge variant="outline" className="font-normal">
                    {interview.interview_type}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> Status
                </div>
                <div className="text-sm font-medium">
                  {getStatusBadge(interview.status)}
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Interviewer Info */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Interviewer Information
            </h3>
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage
                    src={interview?.seeker?.profile_url}
                    alt={interview?.interviewer_name}
                  />
                  <AvatarFallback>
                    {interview?.interviewer_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">
                    {interview?.interviewer_name}
                  </div>
                  {interview?.interviewer_title && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {interview?.interviewer_title}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Meeting Link */}
          {interview.meeting_link && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Meeting Link
              </h3>
              <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                <a
                  href={interview.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-2 break-all"
                >
                  {interview.meeting_link}
                  <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                </a>
              </div>
              {interview.status === "upcoming" && (
                <Button
                  className="w-full mt-3"
                  onClick={() => window.open(interview.meeting_link, "_blank")}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Join Meeting
                </Button>
              )}
            </section>
          )}

          {/* Message from Employer */}
          {interview.message && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Message from Employer
              </h3>
              <div className="p-4 rounded-lg border border-border bg-muted/30 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {interview.message}
              </div>
            </section>
          )}

          {/* Notes */}
          {interview.notes && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes
              </h3>
              <div className="p-4 rounded-lg border border-border bg-muted/30 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {interview.notes}
              </div>
            </section>
          )}

          {/* Feedback (for completed interviews) */}
          {interview.feedback && interview.status === "completed" && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Feedback
              </h3>
              <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {interview.feedback}
              </div>
            </section>
          )}

          {/* Interview Status Info */}
          <section className="bg-muted/50 p-4 rounded-lg border border-border">
            <div className="text-xs text-muted-foreground space-y-1">
              <div>
                <span className="font-medium">Status:</span>{" "}
                <span className="capitalize">
                  {interview.status.replace("_", " ")}
                </span>
              </div>
              {interview.status === "upcoming" && (
                <div className="text-blue-600 dark:text-blue-400 text-xs mt-2">
                  💡 This interview is coming up soon. Make sure you have your
                  meeting link ready!
                </div>
              )}
              {interview.status === "pending_confirm" && (
                <div className="text-amber-600 dark:text-amber-400 text-xs mt-2">
                  ⏳ Waiting for confirmation. Check back soon!
                </div>
              )}
              {interview.status === "completed" && (
                <div className="text-green-600 dark:text-green-400 text-xs mt-2">
                  ✅ Interview completed. Check the feedback section above.
                </div>
              )}
              {interview.status === "cancelled" && (
                <div className="text-red-600 dark:text-red-400 text-xs mt-2">
                  ❌ This interview has been cancelled.
                </div>
              )}
            </div>
          </section>
        </div>

        <DialogFooter className="border-t border-border pt-4 sm:justify-between">
          <div className="flex gap-2 w-full sm:w-auto">
            {interview.status === "upcoming" && interview.meeting_link && (
              <Button
                onClick={() => window.open(interview.meeting_link, "_blank")}
                className="flex-1 sm:flex-none"
              >
                <Video className="h-4 w-4 mr-2" />
                Join Now
              </Button>
            )}
            <DialogClose>
              <Button variant="outline" className="w-full sm:w-auto">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default JobSeekerInterviewModalContent;
