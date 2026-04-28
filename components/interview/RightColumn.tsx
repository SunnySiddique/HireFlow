import { cn } from "@/lib/utils";
import { Interview } from "@/types/interview";
import {
  Clock,
  FileText,
  MessageCircleHeart,
  MessageSquare,
  StickyNote,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const RightColumn = ({ interview }: { interview: Interview }) => {
  const [activeTab, setActiveTab] = useState<"message" | "notes" | "feedback">(
    "message",
  );

  return (
    <>
      <div className="xl:col-span-2">
        <div className="bg-card rounded-2xl lg:rounded-3xl border border-border/50 shadow-sm overflow-hidden flex flex-col h-full min-h-[350px] lg:min-h-[400px]">
          {/* Custom Tab Header */}
          <div className="flex border-b border-border/50 bg-muted/10">
            <button
              onClick={() => setActiveTab("message")}
              className={cn(
                "flex-1 py-3 lg:py-4 text-xs lg:text-sm font-bold flex items-center justify-center gap-1.5 lg:gap-2 transition-colors border-b-2",
                activeTab === "message"
                  ? "border-primary text-primary bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30",
              )}
            >
              <MessageCircleHeart className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="hidden xs:inline">Message</span>
              <span className="xs:hidden">Msg</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={cn(
                "flex-1 py-3 lg:py-4 text-xs lg:text-sm font-bold flex items-center justify-center gap-1.5 lg:gap-2 transition-colors border-b-2",
                activeTab === "notes"
                  ? "border-primary text-primary bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30",
              )}
            >
              <StickyNote className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="hidden xs:inline">Notes</span>
              <span className="xs:hidden">Notes</span>
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={cn(
                "flex-1 py-3 lg:py-4 text-xs lg:text-sm font-bold flex items-center justify-center gap-1.5 lg:gap-2 transition-colors border-b-2",
                activeTab === "feedback"
                  ? "border-primary text-primary bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30",
              )}
            >
              <FileText className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="hidden xs:inline">Feedback</span>
              <span className="xs:hidden">Feedback</span>
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="p-4 lg:p-6 xl:p-8 flex-1 bg-background">
            {activeTab === "message" && (
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-base lg:text-lg font-bold text-foreground flex items-center gap-2">
                  <MessageCircleHeart className="w-4 h-4 lg:w-5 lg:h-5" />
                  Message from {interview.interviewer_name}
                </h3>
                {interview.message ? (
                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                    <p className="text-foreground leading-relaxed italic text-sm lg:text-base">
                      {`"${interview.message}"`}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 lg:py-12 text-center">
                    <MessageSquare className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground text-sm lg:text-base">
                      No message provided.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-3 lg:space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-base lg:text-lg font-bold text-foreground flex items-center gap-2">
                    <StickyNote className="w-4 h-4 lg:w-5 lg:h-5" />
                    Interview Notes
                  </h3>
                </div>
                {interview.notes ? (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 flex-1">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm lg:text-base">
                      {interview.notes}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 lg:py-12 text-center flex-1 border-2 border-dashed border-border/50 rounded-xl lg:rounded-2xl">
                    <StickyNote className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground text-sm lg:text-base">
                      No notes have been provided by the employer yet.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "feedback" && (
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-base lg:text-lg font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 lg:w-5 lg:h-5" />
                  Interview Feedback
                </h3>
                {interview.status === "upcoming" ||
                interview.status === "pending_confirm" ? (
                  <div className="flex flex-col items-center justify-center py-8 lg:py-12 text-center">
                    <Clock className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground text-sm lg:text-base">
                      Feedback will be available after the interview is
                      completed.
                    </p>
                  </div>
                ) : interview.status === "cancelled" ? (
                  <div className="flex flex-col items-center justify-center py-8 lg:py-12 text-center">
                    <XCircle className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground text-sm lg:text-base">
                      No feedback available for canceled interviews.
                    </p>
                  </div>
                ) : interview.feedback ? (
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                    <p className="text-foreground leading-relaxed text-sm lg:text-base">
                      {interview.feedback}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 lg:py-12 text-center">
                    <FileText className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground text-sm lg:text-base">
                      No feedback has been provided yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightColumn;
