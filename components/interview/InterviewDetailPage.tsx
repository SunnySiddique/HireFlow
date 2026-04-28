"use client";

import { getStatusConfig } from "@/constants/interveiwsData";
import { useInterview } from "@/hooks/interview/useInterview";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import { Button } from "../ui/button";
import Hero from "./Hero";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

const InterviewDetailPage = ({
  interviewId,
  role,
}: {
  interviewId: string;
  role: "seeker" | "employer";
}) => {
  const { data: interview, isLoading } = useInterview(interviewId as string);

  const router = useRouter();

  const statusConfig = getStatusConfig(interview?.status ?? "");

  if (isLoading) return <Loader mode="inline" />;
  if (!interview)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-foreground mb-1">
            Interview Not Found
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            This interview doesn't exist or you don't have permission to view
            it.
          </p>
        </div>
        <Button
          variant="outline"
          className="mt-2 border-primary/20 text-primary hover:bg-primary/10"
          onClick={() =>
            router.push(
              role === "seeker"
                ? "/job-seeker/interviews"
                : "/employer/interviews",
            )
          }
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Go Back
        </Button>
      </div>
    );
  return (
    <div className="pb-20">
      {/* Header Area */}
      <div className="bg-card border-b border-border/50 sticky top-0 z-40 backdrop-blur-xl bg-card/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push("/job-seeker/interviews")}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Interviews
          </button>

          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border",
              statusConfig.bg,
              statusConfig.color,
              statusConfig.border,
            )}
          >
            <statusConfig.icon className="w-3.5 h-3.5" />
            {statusConfig.label}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 pt-4 lg:pt-8">
        {/* Hero Section */}
        <Hero interview={interview} role={role} />

        {/* Two Column Layout for Details */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column: Interviewer Info */}
          <LeftColumn interview={interview} />

          {/* Right Column: Interactive Tabs (Message, Notes, Feedback) */}
          <RightColumn interview={interview} />
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailPage;
