"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateApplicantStatus } from "@/hooks/jobs/useApplicants";
import { formatDate, getInitials } from "@/lib/utils";
import { ApplicantType } from "@/types/jobs";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ApplicantDialogProps {
  applicant: ApplicantType | null;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const ApplicantDialog = ({
  applicant,
  open,
  setIsOpen,
}: ApplicantDialogProps) => {
  const { mutateAsync: updateApplicantStatus, isPending } =
    useUpdateApplicantStatus();
  const [applicantUpdates, setApplicantUpdates] = useState({
    status: applicant?.status || "pending",
    employer_notes: applicant?.employer_notes || "",
  });

  const handleUpdateApplicant = async () => {
    await updateApplicantStatus(
      {
        applicantId: applicant?.id || "",
        status: applicantUpdates.status,
        employer_notes: applicantUpdates.employer_notes,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setApplicantUpdates({
            status: "pending",
            employer_notes: "",
          });
        },
      },
    );
  };

  if (!applicant) return null;
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-lg">
              {applicant?.seeker?.profile_url ? (
                <Image
                  src={applicant?.seeker?.profile_url}
                  alt={applicant?.seeker?.full_name}
                  fill
                  sizes="56px"
                  className="object-contain "
                />
              ) : (
                <AvatarFallback className="rounded-lg text-white font-bold">
                  {getInitials(applicant?.seeker?.full_name)}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="truncate">{applicant.seeker.full_name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Contact Information
            </h3>
            <div className="space-y-1.5 text-sm bg-muted/50 rounded-lg p-3">
              <p>
                <span className="text-muted-foreground">Email: </span>
                <span className="text-foreground">
                  {applicant.seeker.email}
                </span>
              </p>
              <p>
                <span className="text-muted-foreground">Position: </span>
                <span className="text-foreground">
                  {applicant.job.job_title}
                </span>
              </p>
              <p>
                <span className="text-muted-foreground">Applied: </span>
                <span className="text-foreground">
                  {formatDate(applicant.applied_at ? applicant.applied_at : "")}
                </span>
              </p>
            </div>
          </div>

          {/* Resume */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Resume
            </h3>
            {applicant.seeker.resume_url ? (
              <a
                href={applicant.seeker.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-sm text-primary hover:underline cursor-pointer"
              >
                View Resume
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">
                No resume uploaded
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Cover Letter
            </h3>
            <p className="text-sm text-foreground bg-muted p-3 rounded-lg leading-relaxed">
              {applicant.cover_letter || "No cover letter provided"}
            </p>
          </div>

          {/* Internal Notes */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Internal Notes
            </h3>
            <Textarea
              defaultValue={
                applicant.employer_notes ? applicant.employer_notes : ""
              }
              value={applicantUpdates.employer_notes}
              onChange={(e) =>
                setApplicantUpdates({
                  ...applicantUpdates,
                  employer_notes: e.target.value,
                })
              }
              className="w-full p-3 text-sm border border-border rounded-lg bg-background text-foreground  resize-none min-h-30"
              placeholder="Add internal notes..."
            />
          </div>

          {/* Update Status */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Update Status
            </h3>
            <Select
              defaultValue={applicant.status ? applicant.status : "pending"}
              value={applicantUpdates.status}
              onValueChange={(val) =>
                setApplicantUpdates({
                  ...applicantUpdates,
                  status: val as ApplicantType["status"],
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2 flex-col sm:flex sm:gap-2">
          <a
            href={`/profile/seeker/${applicant.seeker?.slug || ""}`}
            target="_blank"
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full text-primary hover:text-primary/80"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Profile
            </Button>
          </a>

          <Button
            onClick={handleUpdateApplicant}
            className="w-full sm:w-1/2 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantDialog;
