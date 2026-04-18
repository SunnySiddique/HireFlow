import Loader from "@/components/Loader";
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
import { useActiveJobs, useDeleteJob } from "@/hooks/jobs/useEmployerJobs";
import { formatLabel } from "@/lib/utils";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

const JobListings = () => {
  const { data: jobListings, isLoading } = useActiveJobs();
  const { mutateAsync: deleteJob, isPending } = useDeleteJob();

  if (isLoading) return <Loader mode="inline" />;
  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-base lg:text-lg font-bold text-foreground">
          Active Job Listings
        </h2>
        <a
          target="_blank"
          href={"/employer/jobs"}
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
            {(jobListings ?? []).length > 0 ? (
              jobListings!.map((job) => (
                <TableRow
                  key={job.id}
                  className="border-b border-border hover:bg-muted/50"
                >
                  {/* Job Title */}
                  <TableCell className="py-3 lg:py-4">
                    <div>
                      <p className="font-medium text-foreground text-xs lg:text-sm">
                        {job.job_title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatLabel(job.employment_type as string)} ·{" "}
                        {formatLabel(job.remote_option as string)}
                      </p>
                    </div>
                  </TableCell>

                  {/* Applicants — placeholder for now */}
                  <TableCell className="text-foreground font-medium text-xs lg:text-sm hidden sm:table-cell">
                    {job.applicants[0].count ?? 0}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      className={`text-xs lg:text-sm capitalize ${
                        job.status === "open"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : job.status === "closed"
                            ? "bg-red-100 text-red-700 hover:bg-red-100"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }`}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>

                  {/* Posted Date */}
                  <TableCell className="text-muted-foreground text-xs lg:text-sm hidden md:table-cell">
                    {new Date(job.created_at as string).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/employer/jobs/${job.job_slug}/edit`}
                        className="p-1.5 lg:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="w-3 lg:w-4 h-3 lg:h-4" />
                      </Link>
                      <a
                        target="_blank"
                        href={`/employer/jobs/${job.job_slug}`}
                        className="p-1.5 lg:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground hidden sm:block"
                      >
                        <Eye className="w-3 lg:w-4 h-3 lg:h-4" />
                      </a>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="p-1.5 lg:p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
                      >
                        {isPending ? (
                          <Loader2 className="w-3 lg:w-4 h-3 lg:h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-3 lg:w-4 h-3 lg:h-4" />
                        )}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground text-sm"
                >
                  No active job listings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default JobListings;
