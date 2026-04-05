import { typeIcon, typeLabel } from "@/constants/InterviewsData";
import { notifyInterview } from "@/types/interview";
import { Calendar, Clock, User } from "lucide-react";

const InterviewDetialsCard = ({
  interview,
}: {
  interview: notifyInterview;
}) => {
  return (
    <>
      <div className="bg-muted/30 rounded-2xl p-6 border border-border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
          Proposed Time & Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-0.5">Date</p>
              <p className="font-medium text-foreground">
                {new Date(interview.scheduled_at).toLocaleDateString(
                  undefined,
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-0.5">
                Time & Duration
              </p>
              <p className="font-medium text-foreground">
                {new Date(interview.scheduled_at).toLocaleTimeString(
                  undefined,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {interview.duration_minutes} min
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
              {typeIcon(interview.interview_type)}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-0.5">Format</p>
              <p className="font-medium text-foreground">
                {typeLabel[interview.interview_type] ??
                  interview.interview_type}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-0.5">
                Interviewer
              </p>
              <p className="font-medium text-foreground">
                {interview.interviewer_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {interview.interviewer_title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewDetialsCard;
