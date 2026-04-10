"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Interview } from "@/types/interview";
import InterviewRowController from "./InterviewRowController";

interface InterviewsTableProps {
  interviews: Interview[];
  onView?: (interview: Interview) => void;
  onDeleteClick?: (interview: Interview) => void;
  isDeleting: boolean;
}

const EmployerInterviewsTable = ({
  interviews,
  onView,
  onDeleteClick,
  isDeleting,
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
              interviews.map((interview) => (
                <InterviewRowController
                  key={interview.id}
                  interview={interview}
                  onView={onView}
                  onDeleteClick={onDeleteClick}
                  isDeleting={isDeleting}
                />
              ))
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
          interviews.map((interview) => (
            <EmployerInterviewMobileCard
              key={interview.id}
              interview={interview}
              onView={onView}
              onDeleteClick={onDeleteClick}
              isDeleting={isDeleting}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EmployerInterviewsTable;
