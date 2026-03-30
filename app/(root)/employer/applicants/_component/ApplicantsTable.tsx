import InterviewModal from "@/components/employer/interviews/InterviewModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useArchiveApplicant } from "@/hooks/useJobs";
import { formatDate, getInitials } from "@/lib/utils";
import { ApplicantType } from "@/types/jobs";
import {
  Archive,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Inbox,
  MoreVertical,
  Users,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ApplicantDialog from "./ApplicantDialog";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  reviewing: "bg-blue-100 text-blue-700 border border-blue-300",
  shortlisted: "bg-purple-100 text-purple-700 border border-purple-300",
  rejected: "bg-red-100 text-red-700 border border-red-300",
  accepted: "bg-green-100 text-green-700 border border-green-300",
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="w-3 h-3" />,
  reviewing: <Users className="w-3 h-3" />,
  shortlisted: <CheckCircle className="w-3 h-3" />,
  rejected: <XCircle className="w-3 h-3" />,
  accepted: <CheckCircle className="w-3 h-3" />,
};

const ApplicantsTable = ({ applicants }: { applicants: ApplicantType[] }) => {
  const { mutate: archiveApplicant } = useArchiveApplicant();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    useState<ApplicantType | null>(null);

  const handleArchive = (applicantId: string, isArchived: boolean) => {
    archiveApplicant({ applicationId: applicantId, isArchived });
  };

  return (
    <>
      <ApplicantDialog
        applicant={selectedApplicant}
        open={isOpen}
        setIsOpen={setIsOpen}
      />
      <InterviewModal
        isView={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Card className="bg-background border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="border-b border-border hover:bg-muted">
                <TableHead className="text-foreground font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Candidate
                </TableHead>
                <TableHead className="text-foreground font-semibold text-xs sm:text-sm hidden sm:table-cell whitespace-nowrap">
                  Job Title
                </TableHead>
                <TableHead className="text-foreground font-semibold text-xs sm:text-sm hidden md:table-cell whitespace-nowrap">
                  Applied Date
                </TableHead>
                <TableHead className="text-foreground font-semibold text-xs sm:text-sm whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="text-foreground font-semibold text-xs sm:text-sm text-right whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <TableRow
                    key={applicant.id}
                    className="border-b border-border hover:bg-accent/50 transition"
                  >
                    <TableCell className="py-2 sm:py-3 lg:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
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
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                            {applicant?.seeker?.full_name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground truncate hidden xs:block">
                            {applicant.seeker.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-foreground hidden sm:table-cell truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]">
                      {applicant.job.job_title}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-muted-foreground hidden md:table-cell whitespace-nowrap">
                      {formatDate(applicant.applied_at)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusColors[applicant.status.toLowerCase()]} text-[10px] sm:text-xs whitespace-nowrap`}
                      >
                        <span className="mr-1">
                          {statusIcons[applicant.status.toLowerCase()]}
                        </span>
                        {applicant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View Applicant */}
                        <TooltipProvider>
                          <div className="flex items-center justify-end gap-1">
                            {/* View Applicant */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setSelectedApplicant(applicant);
                                    setIsOpen(true);
                                  }}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs">
                                View Applicant
                              </TooltipContent>
                            </Tooltip>

                            {/* Send Interview */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => setIsOpen(true)}
                                >
                                  <Calendar className="w-4 h-4 text-primary" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs">
                                Send Interview
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>

                        {/* More Options Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-destructive/10"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() =>
                                handleArchive(applicant.id, !applicant.archived)
                              }
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Archive className="w-4 h-4" />
                              <span>
                                {applicant.archived ? "Unarchive" : "Archive"}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs text-muted-foreground cursor-default">
                              More options coming soon
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-64">
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <div className="rounded-full bg-muted p-4">
                        <Inbox className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          No Applicants Found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          There are no applicants yet. When candidates apply to
                          your jobs, they will appear here.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default ApplicantsTable;
