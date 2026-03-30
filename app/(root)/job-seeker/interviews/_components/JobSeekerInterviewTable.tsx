import InterviewPagination from "@/components/pagination/InterviewPagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusBadge } from "@/constants/InterviewsData";
import { Eye } from "lucide-react";
import JobSeekerInterviewModalContent from "./JobSeekerInterviewModalContent";

const JobSeekerInterviewTable = ({
  mockInterviews,
}: {
  mockInterviews: any[];
}) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[250px]">Company / Employer</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Scheduled At</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInterviews.map((interview) => (
              <TableRow
                key={interview.id}
                className={
                  interview.status === "upcoming"
                    ? "bg-primary/5 hover:bg-primary/10"
                    : ""
                }
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={interview.company.logo}
                        alt={interview.company.name}
                      />
                      <AvatarFallback>
                        {interview.company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">
                      {interview.company.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{interview.jobTitle}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {interview.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {interview.scheduledAt}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {interview.duration}
                </TableCell>
                <TableCell>{getStatusBadge(interview.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    {interview.status === "upcoming" &&
                      interview.meetingLink && (
                        <Button size="sm" className="h-8">
                          Join
                        </Button>
                      )}
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <JobSeekerInterviewModalContent interview={interview} />
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <InterviewPagination />
      </div>

      {/* Mobile Stacked Cards */}
      <div className="md:hidden flex flex-col divide-y divide-border">
        {mockInterviews.map((interview) => (
          <div
            key={interview.id}
            className={`p-4 space-y-4 ${interview.status === "upcoming" ? "bg-primary/5" : ""}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={interview.company.logo}
                    alt={interview.company.name}
                  />
                  <AvatarFallback>
                    {interview.company.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">
                    {interview.company.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {interview.jobTitle}
                  </div>
                </div>
              </div>
              {getStatusBadge(interview.status)}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Type</div>
                <Badge variant="outline" className="font-normal text-xs">
                  {interview.type}
                </Badge>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Scheduled
                </div>
                <div className="text-xs">{interview.scheduledAt}</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              {interview.status === "upcoming" && interview.meetingLink && (
                <Button size="sm" className="flex-1 text-xs h-8">
                  Join Meeting
                </Button>
              )}
              <Dialog>
                <DialogTrigger>
                  <Button variant="outline" className="flex-1 text-xs h-8">
                    <Eye className="h-3.5 w-3.5 mr-2" /> View Details
                  </Button>
                </DialogTrigger>
                <JobSeekerInterviewModalContent interview={interview} />
              </Dialog>
            </div>
          </div>
        ))}
        <InterviewPagination />
      </div>
    </>
  );
};

export default JobSeekerInterviewTable;
