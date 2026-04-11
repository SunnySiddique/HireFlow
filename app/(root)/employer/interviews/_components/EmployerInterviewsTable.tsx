"use client";

import { TableCell, TableRow } from "@/components/ui/table";
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
    </div>
  );
};

export default EmployerInterviewsTable;
