"use client";
import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useInterview } from "@/hooks/useInterview";
import { Briefcase, CheckCircle, MessageSquare, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import InteractiveActions from "./_components/InteractiveActions";
import InterviewDetialsCard from "./_components/InterviewDetialsCard";

const InterviewNotificationDetailPage = () => {
  const { id } = useParams();
  const { data: interview, isLoading } = useInterview(id as string);

  if (isLoading) return <Loader mode="full" />;
  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8">
      <Card className="border-border shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-border shadow-sm">
                <AvatarImage
                  src={interview?.employer?.company_logo_url as string}
                />
                <AvatarFallback className="text-xl">
                  {interview?.employer?.company_name ?? "company_name"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-foreground leading-tight">
                  {interview?.applicant?.job?.job_title ?? "Job Title"}
                </h2>
                <p className="text-base text-muted-foreground mt-1 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {interview?.employer?.company_name ?? "Company Name"}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            {interview?.status === "pending_confirm" && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 text-sm">
                Action Required
              </Badge>
            )}
            {interview?.status === "upcoming" && (
              <Badge className="bg-[#3B6D11] hover:bg-[#3B6D11]/90 text-white px-3 py-1 text-sm flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Accepted
              </Badge>
            )}
            {interview?.status === "canceled" && (
              <Badge
                variant="destructive"
                className="px-3 py-1 text-sm flex items-center gap-1.5"
              >
                <XCircle className="h-4 w-4" /> Declined
              </Badge>
            )}
          </div>

          {/* Interview Details Grid */}
          <InterviewDetialsCard interview={interview} />

          {/* Message */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Message from Employer
            </h3>
            <div className="bg-card border border-border rounded-xl p-5 text-base text-foreground leading-relaxed shadow-sm">
              {`"${interview?.message ?? "No message provided."}"`}
            </div>
          </div>

          {/* Interactive Actions / Meeting Link */}

          <InteractiveActions
            status={
              (interview?.status as
                | "pending_confirm"
                | "upcoming"
                | "completed"
                | "cancelled") || "pending_confirm"
            }
            meetingLink={interview?.meeting_link as string}
            interviewId={interview?.id as string}
            scheduledAt={interview?.scheduled_at as string}
            interviewerId={interview?.interviewer_id as string}
          />
        </div>
      </Card>
    </div>
  );
};

export default InterviewNotificationDetailPage;
