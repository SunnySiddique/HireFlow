import { useJoinAvailable } from "@/hooks/interview/useJoinAvailable";
import { Interview } from "@/types/interview";
import { User, Video } from "lucide-react";

const LeftColumn = ({ interview }: { interview: Interview }) => {
  const { isJoinAvailable } = useJoinAvailable(
    interview.id,
    interview.scheduled_at ?? "",
  );
  return (
    <>
      <div className="xl:col-span-1 space-y-4 lg:space-y-6">
        <div className="bg-card rounded-2xl lg:rounded-3xl border border-border/50 p-4 lg:p-6 shadow-sm">
          <h3 className="text-base lg:text-lg font-bold text-foreground mb-3 lg:mb-4">
            Interviewer
          </h3>
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <User className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-foreground text-base lg:text-lg truncate">
                {interview.interviewer_name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {interview.interviewer_title}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl lg:rounded-3xl border border-border/50 p-4 lg:p-6 shadow-sm">
          <h3 className="text-base lg:text-lg font-bold text-foreground mb-3 lg:mb-4">
            Meeting Details
          </h3>
          <div className="space-y-3 lg:space-y-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Platform
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                <Video className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                {interview.interview_type}
              </div>
            </div>
            <div>
              {isJoinAvailable && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftColumn;
