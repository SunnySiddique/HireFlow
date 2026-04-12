import { Interview } from "@/types/interview";
import { User, Video } from "lucide-react";

const LeftColumn = ({ interview }: { interview: Interview }) => {
  return (
    <>
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-card rounded-3xl border border-border/50 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Interviewer
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <User className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">
                {interview.interviewer_name}
              </p>
              <p className="text-sm text-muted-foreground">
                {interview.interviewer_title}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-3xl border border-border/50 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Meeting Details
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Platform
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                <Video className="w-3.5 h-3.5" />
                {interview.interview_type}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Meeting Link
              </p>
              {interview.meeting_link ? (
                <a
                  href={interview.meeting_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-500 hover:underline break-all"
                >
                  {interview.meeting_link}
                </a>
              ) : (
                <p className="text-sm text-foreground">Not provided yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftColumn;
