import EmployerInterviewModal from "@/components/employer/interviews/EmployerInterviewModal";
import { Button } from "@/components/ui/button";
import { useInterviews } from "@/hooks/interview/useInterview";
import { useArchiveApplicant } from "@/hooks/jobs/useApplicants";
import { cn } from "@/lib/utils";
import { randomImage } from "@/lib/utils/randomImage";
import { ApplicantType } from "@/types/jobs";
import {
  Archive,
  ArchiveRestore,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Loader2,
  Mail,
  Users,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ApplicantDialog from "./ApplicantDialog";

export const getApplicantStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return {
        color: "text-amber-600",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        icon: Clock,
        label: "Pending",
      };
    case "reviewing":
      return {
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        icon: Users,
        label: "Reviewing",
      };
    case "shortlisted":
      return {
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        icon: CheckCircle2,
        label: "Shortlisted",
      };
    case "rejected":
      return {
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        icon: XCircle,
        label: "Rejected",
      };
    case "accepted":
      return {
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        icon: CheckCircle2,
        label: "Accepted",
      };
    default:
      return {
        color: "text-muted-foreground",
        bg: "bg-muted",
        border: "border-border",
        icon: FileText,
        label: status,
      };
  }
};

export const ApplicantCard = ({
  applicant,
}: {
  applicant: ApplicantType;
  onScheduleInterview?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}) => {
  const { mutate: archiveApplicant, isPending } = useArchiveApplicant();
  const { data } = useInterviews({}, "employer");

  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    useState<ApplicantType | null>(null);
  const interviews = data?.data ?? [];

  const isInterviewScheduled = interviews?.some(
    (interview) => interview.application_id === applicant.id,
  );
  const statusConfig = getApplicantStatusConfig(applicant.status);

  const appliedDate = new Date(applicant.applied_at);
  const formattedDate = appliedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleArchive = (applicantId: string, isArchived: boolean) => {
    archiveApplicant({ applicationId: applicantId, isArchived });
  };

  return (
    <>
      <ApplicantDialog
        key={selectedApplicant?.id}
        applicant={selectedApplicant}
        open={isApplicantModalOpen}
        setIsOpen={setIsApplicantModalOpen}
      />
      <EmployerInterviewModal
        isView={false}
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
        applicationId={applicant.id}
        seekerId={applicant.seeker?.auth_id}
        seekerName={applicant.seeker?.full_name || ""}
      />
      <div
        className={cn(
          "bg-card/80 backdrop-blur-xl rounded-2xl border p-4 sm:p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden",
          applicant.status === "shortlisted"
            ? "border-purple-500/20 hover:border-purple-500/40"
            : "border-border/50",
        )}
      >
        {/* Decorative background glow */}
        {applicant.status === "shortlisted" && (
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
        )}

        <div className="relative z-10">
          {/* Header: Candidate & Job */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border-2 border-background bg-card shadow-sm overflow-hidden shrink-0">
                <Image
                  src={
                    applicant.seeker.profile_url ||
                    randomImage(applicant.seeker.full_name)
                  }
                  alt={applicant.seeker.full_name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground leading-tight">
                  {applicant.seeker.full_name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {applicant.job.job_title}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2">
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

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 bg-muted/30 p-3 sm:p-4 rounded-xl border border-border/50">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {applicant.seeker.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Applied Date
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground font-medium">
              {applicant.archived
                ? "Archived Application"
                : "Active Application"}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-lg font-bold px-4 h-9 text-sm transition-all duration-300"
                onClick={() => {
                  setSelectedApplicant(applicant);
                  setIsApplicantModalOpen(true);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>

              <Button
                className="w-full sm:w-auto rounded-lg font-bold px-4 h-9 text-sm transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25"
                onClick={() => setIsInterviewModalOpen(true)}
                disabled={isInterviewScheduled}
              >
                {isInterviewScheduled ? (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Interview Scheduled
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                className="w-full sm:w-auto rounded-lg font-bold px-4 h-9 text-sm transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={() => handleArchive(applicant.id, !applicant.archived)}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {applicant.archived ? "Unarchiving..." : "Archiving..."}
                  </>
                ) : applicant.archived ? (
                  <>
                    <ArchiveRestore className="w-4 h-4 mr-2" />
                    Unarchive
                  </>
                ) : (
                  <>
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
