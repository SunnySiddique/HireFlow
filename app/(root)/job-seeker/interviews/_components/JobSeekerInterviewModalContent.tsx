import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getStatusBadge } from "@/constants/InterviewsData";
import { Calendar, Clock, User, Video } from "lucide-react";

const JobSeekerInterviewModalContent = ({ interview }: { interview: any }) => {
  return (
    <>
      <DialogContent className="max-w-2xl max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto sm:rounded-xl w-full h-full sm:h-auto border-0 sm:border">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={interview.company.logo} />
                <AvatarFallback>
                  {interview.company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {interview.company.name}
            </DialogTitle>
            {getStatusBadge(interview.status)}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Interview Info */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Interview Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg border border-border">
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Scheduled At
                </div>
                <div className="text-sm font-medium">
                  {interview.scheduledAt}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> Duration
                </div>
                <div className="text-sm font-medium">{interview.duration}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5" /> Type
                </div>
                <div className="text-sm font-medium">{interview.type}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> Job Title
                </div>
                <div className="text-sm font-medium">{interview.jobTitle}</div>
              </div>
            </div>
          </section>

          {/* Interviewer Info */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Interviewer
            </h3>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {interview.interviewer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">
                  {interview.interviewer.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {interview.interviewer.title}
                </div>
              </div>
            </div>
          </section>

          {/* Message */}
          {interview.message && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Message from Employer
              </h3>
              <div className="p-4 rounded-lg border border-border bg-card text-sm text-foreground whitespace-pre-wrap">
                {interview.message}
              </div>
            </section>
          )}
        </div>

        <DialogFooter className="border-t border-border pt-4 sm:justify-end">
          <DialogClose>
            <Button variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default JobSeekerInterviewModalContent;
