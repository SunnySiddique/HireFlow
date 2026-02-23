import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Trash2 } from "lucide-react";
const jobListings = [
  {
    title: "Senior React Developer",
    type: "Full-time",
    location: "Remote",
    applicants: 34,
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    posted: "3 days ago",
  },
  {
    title: "Product Manager",
    type: "Full-time",
    location: "Hybrid",
    applicants: 21,
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    posted: "5 days ago",
  },
  {
    title: "UX/UI Designer",
    type: "Contract",
    location: "Remote",
    applicants: 47,
    status: "Reviewing",
    statusColor: "bg-yellow-100 text-yellow-800",
    posted: "1 week ago",
  },
  {
    title: "DevOps Engineer",
    type: "Full-time",
    location: "On-site",
    applicants: 12,
    status: "Draft",
    statusColor: "bg-blue-100 text-blue-800",
    posted: "2 weeks ago",
  },
  {
    title: "Backend Node.js Dev",
    type: "Part-time",
    location: "Remote",
    applicants: 34,
    status: "Closed",
    statusColor: "bg-gray-100 text-gray-800",
    posted: "3 weeks ago",
  },
];

const JobListings = () => {
  return (
    <>
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-base lg:text-lg font-bold text-foreground">
            Active Job Listings
          </h2>
          <a
            href="#"
            className="text-primary hover:underline text-xs lg:text-sm"
          >
            View all →
          </a>
        </div>
        <Card className="bg-background border border-border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="border-b border-border hover:bg-muted">
                <TableHead className="text-foreground font-semibold text-xs lg:text-sm">
                  Job Title
                </TableHead>
                <TableHead className="text-foreground font-semibold text-xs lg:text-sm hidden sm:table-cell">
                  Applicants
                </TableHead>
                <TableHead className="text-foreground font-semibold text-xs lg:text-sm">
                  Status
                </TableHead>
                <TableHead className="text-foreground font-semibold text-xs lg:text-sm hidden md:table-cell">
                  Posted
                </TableHead>
                <TableHead className="text-foreground font-semibold text-xs lg:text-sm text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobListings.map((job, idx) => (
                <TableRow
                  key={idx}
                  className="border-b border-border hover:bg-muted/50"
                >
                  <TableCell className="py-3 lg:py-4">
                    <div>
                      <p className="font-medium text-foreground text-xs lg:text-sm">
                        {job.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {job.type} · {job.location}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground font-medium text-xs lg:text-sm hidden sm:table-cell">
                    {job.applicants}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${job.statusColor} text-xs lg:text-sm`}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs lg:text-sm hidden md:table-cell">
                    {job.posted}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-1">
                    <button className="p-1.5 lg:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground">
                      <Edit className="w-3 lg:w-4 h-3 lg:h-4" />
                    </button>
                    <button className="p-1.5 lg:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground hidden sm:block">
                      <Eye className="w-3 lg:w-4 h-3 lg:h-4" />
                    </button>
                    <button className="p-1.5 lg:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground">
                      <Trash2 className="w-3 lg:w-4 h-3 lg:h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
};

export default JobListings;
