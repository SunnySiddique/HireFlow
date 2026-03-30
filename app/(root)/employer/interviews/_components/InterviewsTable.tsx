"use client";

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
import { Eye, Trash2 } from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  interviewType: string;
  date: string;
  time: string;
  duration: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  meetingLink: string;
  interviewerName: string;
  interviewerTitle: string;
  message: string;
  notes: string;
  feedback: string;
}

interface InterviewsTableProps {
  interviews: Interview[];
  onView: (interview: Interview) => void;
  // onDelete: (id: string) => void;
}

const statusColors = {
  Scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "In Progress":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function InterviewsTable({
  interviews,
  onView,
  // onDelete,
}: InterviewsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="font-semibold text-foreground">
              Candidate
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Interview Type
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
            <TableHead className="text-right font-semibold text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground py-8"
              >
                No interviews found
              </TableCell>
            </TableRow>
          ) : (
            interviews.map((interview) => (
              <TableRow
                key={interview.id}
                className="border-border hover:bg-accent/50"
              >
                <TableCell className="font-medium text-foreground">
                  {interview.candidateName}
                </TableCell>
                <TableCell className="text-foreground">
                  {interview.interviewType}
                </TableCell>
                <TableCell className="text-foreground">
                  {interview.date} at {interview.time}
                </TableCell>
                <TableCell className="text-foreground">
                  {interview.duration}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${statusColors[interview.status as keyof typeof statusColors]}`}
                  >
                    {interview.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(interview)}
                      className="hover:bg-primary/10 hover:text-primary"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={() => onDelete(interview.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                      title="Delete interview"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
