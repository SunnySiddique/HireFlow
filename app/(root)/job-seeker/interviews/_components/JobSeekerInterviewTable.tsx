"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Interview } from "@/types/interview";
import InterviewMobileCard from "./InterviewMobileCard";
import InterviewRow from "./InterviewRow";

const JobSeekerInterviewTable = ({
  interviews,
}: {
  interviews: Interview[];
}) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Company</TableHead>
              <TableHead>Interviewer</TableHead>
              <TableHead>Interview Type</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviews.map((interview) => (
              <InterviewRow key={interview.id} interview={interview} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col divide-y divide-border">
        {interviews.map((interview) => (
          <InterviewMobileCard key={interview.id} interview={interview} />
        ))}
      </div>
    </>
  );
};

export default JobSeekerInterviewTable;
