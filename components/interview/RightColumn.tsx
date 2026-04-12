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
      <div className="lg:col-span-2">
        <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden flex flex-col h-full min-h-[400px]">
          {/* Custom Tab Header */}
          <div className="flex border-b border-border/50 bg-muted/10">
            <button
              onClick={() => setActiveTab("message")}
              className={cn(
                "flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2",
                activeTab === "message"
                  ? "border-primary text-primary bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30",
              )}
            >
              <MessageCircleHeart className="w-4 h-4" /> Message
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={cn(
                "flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2",
                activeTab === "notes"
                  ? "border-primary text-primary bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30",
              )}
            >
              <StickyNote className="w-4 h-4" /> Notes
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={cn(
                "flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2",
                activeTab === "feedback"
                  ? "border-primary text-primary bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30",
              )}
            >
              <FileText className="w-4 h-4" /> Feedback
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="p-6 sm:p-8 flex-1 bg-background">
            {activeTab === "message" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  Message from {interview.interviewer_name}
                </h3>
                {interview.message ? (
                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6">
                    <p className="text-foreground leading-relaxed italic">
                      {`"${interview.message}"`}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground">
                      No message provided.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    Interview Notes
                  </h3>
                </div>
                {interview.notes ? (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 flex-1">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {interview.notes}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center flex-1 border-2 border-dashed border-border/50 rounded-2xl">
                    <StickyNote className="w-12 h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground">
                      No notes have been provided by the employer yet.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "feedback" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  Interview Feedback
                </h3>
                {interview.status === "upcoming" ||
                interview.status === "pending_confirm" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Clock className="w-12 h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground">
                      Feedback will be available after the interview is
                      completed.
                    </p>
                  </div>
                ) : interview.status === "cancelled" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <XCircle className="w-12 h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground">
                      No feedback available for canceled interviews.
                    </p>
                  </div>
                ) : interview.feedback ? (
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                    <p className="text-foreground leading-relaxed">
                      {interview.feedback}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground">
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
