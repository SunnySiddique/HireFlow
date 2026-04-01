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
import { Interview } from "@/types/interview";
import { Calendar, Clock, Eye } from "lucide-react";
import JobSeekerInterviewModalContent from "./JobSeekerInterviewModalContent";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

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
            {interviews.map((interview, idx) => (
              <TableRow
                key={idx}
                className={
                  interview.status === "upcoming"
                    ? "bg-primary/5 hover:bg-primary/10"
                    : ""
                }
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={interview?.employer?.company_logo_url}
                        alt={interview?.employer?.company_name}
                      />
                      <AvatarFallback>
                        {interview?.employer?.company_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                      {interview?.employer?.company_name || "N/A"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <span className="font-medium text-sm">
                      {interview.interviewer_name}
                    </span>
                    {interview.interviewer_title && (
                      <div className="text-xs text-muted-foreground">
                        {interview.interviewer_title}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {interview.interview_type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(interview.scheduled_at)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {interview.duration_minutes} mins
                </TableCell>
                <TableCell>{getStatusBadge(interview.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    {interview.status === "upcoming" &&
                      interview.meeting_link && (
                        <Button size="sm" className="h-8">
                          Join
                        </Button>
                      )}
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
      </div>

      {/* Mobile Stacked Cards */}
      <div className="md:hidden flex flex-col divide-y divide-border">
        {interviews.map((interview, idx) => (
          <div
            key={idx}
            className={`p-4 space-y-4 ${interview.status === "upcoming" ? "bg-primary/5" : ""}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={interview?.employer?.company_logo_url}
                    alt={interview?.employer?.company_name}
                  />
                  <AvatarFallback>
                    {interview?.employer?.company_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">
                    {interview?.employer?.company_name || "N/A"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    By {interview.interviewer_name}
                  </div>
                  {interview.interviewer_title && (
                    <div className="text-xs text-muted-foreground">
                      {interview.interviewer_title}
                    </div>
                  )}
                </div>
              </div>
              {getStatusBadge(interview.status)}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-normal text-xs">
                  {interview.interview_type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(interview.scheduled_at)}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-4 w-4" />
                {interview.duration_minutes} minutes
              </div>
            </div>

            {interview.message && (
              <div className="bg-muted/30 p-2 rounded text-xs">
                <p className="text-muted-foreground">{interview.message}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {interview.status === "upcoming" && interview.meeting_link && (
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
      </div>
    </>
  );
};

export default JobSeekerInterviewTable;
