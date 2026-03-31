"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Interview } from "@/types/interview";
import {
  Eye,
  MapPin,
  MonitorSmartphone,
  Phone,
  Trash2,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";

interface InterviewsTableProps {
  interviews: Interview[];
  onView?: (interview: Interview) => void;
  onDelete?: (id: string) => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  upcoming: {
    label: "Upcoming",
    className: "bg-secondary/15 text-secondary border border-secondary/20",
  },
  pending_confirm: {
    label: "Pending",
    className: "bg-chart-3/40 text-chart-2 border border-chart-3/30",
  },
  completed: {
    label: "Completed",
    className: "bg-chart-1/20 text-chart-1 border border-chart-1/20",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-destructive/10 text-destructive border border-destructive/20",
  },
};

const typeIcon = (type: string) => {
  switch (type) {
    case "zoom":
      return <Video className="h-3.5 w-3.5" />;
    case "google_meet":
      return <MonitorSmartphone className="h-3.5 w-3.5" />;
    case "ms_teams":
      return <Users className="h-3.5 w-3.5" />;
    case "phone":
      return <Phone className="h-3.5 w-3.5" />;
    case "in_person":
      return <MapPin className="h-3.5 w-3.5" />;
    default:
      return <MonitorSmartphone className="h-3.5 w-3.5" />;
  }
};

const typeLabel: Record<string, string> = {
  zoom: "Zoom",
  google_meet: "Google Meet",
  ms_teams: "MS Teams",
  phone: "Phone",
  in_person: "In Person",
};

const getInitials = (name: string) =>
  name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "??";

const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-chart-1/20 text-chart-1",
  "bg-chart-2/20 text-chart-2",
  "bg-chart-3/40 text-chart-2",
];

const getAvatarColor = (name: string) =>
  avatarColors[name?.charCodeAt(0) % avatarColors.length] ?? avatarColors[0];

const CandidateAvatar = ({
  name,
  profileUrl,
  size = "md",
}: {
  name: string;
  profileUrl?: string;
  size?: "sm" | "md";
}) => {
  const dim = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-xs";

  if (profileUrl) {
    return (
      <div
        className={`${dim} rounded-full overflow-hidden shrink-0 border border-border`}
      >
        <Image
          src={profileUrl}
          alt={name}
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-semibold shrink-0 ${getAvatarColor(name)}`}
    >
      {getInitials(name)}
    </div>
  );
};

const EmployerInterviewsTable = ({
  interviews,
  onView,
  onDelete,
}: InterviewsTableProps) => {
  return (
    <div className="w-full space-y-4">
      {/* Desktop Table */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold text-foreground pl-5">
                Candidate
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Interviewer
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Type
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Date & Time
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Duration
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Status
              </TableHead>
              <TableHead className="text-right font-semibold text-foreground pr-5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviews.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground py-10"
                >
                  No interviews found
                </TableCell>
              </TableRow>
            ) : (
              interviews.map((interview) => {
                const status = statusConfig[interview.status] ?? {
                  label: interview.status,
                  className: "",
                };
                return (
                  <TableRow
                    key={interview.id}
                    className="border-border hover:bg-accent/40 transition-colors"
                  >
                    {/* Candidate */}
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <CandidateAvatar
                          name={interview.interviewer_name}
                          profileUrl={interview.seeker?.profile_url}
                          size="sm"
                        />
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {interview.interviewer_name}
                          </p>
                          {interview.interviewer_title && (
                            <p className="text-xs text-muted-foreground">
                              {interview.interviewer_title}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Interviewer title */}
                    <TableCell className="text-sm text-muted-foreground">
                      {interview.interviewer_title ?? "—"}
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-muted-foreground capitalize">
                        {typeIcon(interview.interview_type)}
                        <span className="text-sm">
                          {typeLabel[interview.interview_type] ??
                            interview.interview_type}
                        </span>
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-sm text-foreground">
                      {new Date(interview.scheduled_at).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </TableCell>

                    {/* Duration */}
                    <TableCell className="text-sm text-muted-foreground">
                      {interview.duration_minutes} mins
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`text-xs font-medium rounded-full px-2.5 py-0.5 ${status.className}`}
                      >
                        {status.label}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right pr-5">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView?.(interview)}
                          className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary rounded-lg"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Interview
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the interview
                                with{" "}
                                <span className="font-medium text-foreground">
                                  {interview.interviewer_name}
                                </span>
                                ? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete?.(interview.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {interviews.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No interviews found
          </div>
        ) : (
          interviews.map((interview) => {
            const status = statusConfig[interview.status] ?? {
              label: interview.status,
              className: "",
            };
            return (
              <div
                key={interview.id}
                className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <CandidateAvatar
                      name={interview.interviewer_name}
                      profileUrl={interview.seeker?.profile_url}
                      size="md"
                    />
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {interview.interviewer_name}
                      </p>
                      <div className="flex items-center gap-1 text-muted-foreground mt-0.5">
                        {typeIcon(interview.interview_type)}
                        <span className="text-xs capitalize">
                          {interview.interview_type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs font-medium rounded-full px-2.5 py-0.5 ${status.className}`}
                  >
                    {status.label}
                  </Badge>
                </div>

                {interview.interviewer_title && (
                  <p className="text-xs text-muted-foreground -mt-1">
                    {interview.interviewer_title}
                  </p>
                )}

                {interview.message && (
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 line-clamp-2">
                    {interview.message}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                  <span>
                    {new Date(interview.scheduled_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" · "}
                    {interview.duration_minutes} mins
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView?.(interview)}
                      className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary rounded-lg"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Interview</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the interview with{" "}
                            <span className="font-medium text-foreground">
                              {interview.interviewer_name}
                            </span>
                            ? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete?.(interview.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EmployerInterviewsTable;
