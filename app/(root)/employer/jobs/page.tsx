"use client";

import NoJobsFound from "@/components/jobs/NoJobsFound";
import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEmployerProfile } from "@/hooks/useEmployer";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import {
  useDeleteJob,
  useGetEmployerJobs,
  useUpdateJobStatus,
} from "@/hooks/useJobs";
import { formatLabel, formatSalary } from "@/lib/utils";
import { Job } from "@/types/jobs";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Edit2,
  Eye,
  LoaderCircle,
  MapPin,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-green-50 text-green-700 ...";
    case "closed":
      return "bg-red-50 text-red-700 ...";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const ManageJobsPage = () => {
  const { data: user } = useGetCurrentUser();
  useEmployerProfile();
  const { mutateAsync: updateStatus } = useUpdateJobStatus();
  const { data: empJobs, isLoading: empJobLoading } = useGetEmployerJobs(
    user?.id as string,
  );
  const { mutateAsync: deleteJobPost, isPending: isDeletingJob } =
    useDeleteJob();

  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>(empJobs || []);
  const [updatingStatusJobId, setUpdatingStatusJobId] = useState<string | null>(
    null,
  );

  const handleDeleteJob = async (jobId: string) => {
    setJobToDelete(jobId);
    await deleteJobPost(jobId, { onSettled: () => setJobToDelete(null) });
  };

  const handleChangeJobStatus = async (jobId: string, newStatus: string) => {
    setUpdatingStatusJobId(jobId);
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
    try {
      await updateStatus({ jobId, status: newStatus });
    } catch {
      if (empJobs) setJobs(empJobs);
    } finally {
      setUpdatingStatusJobId(null);
    }
  };

  useEffect(() => {
    if (empJobs) setJobs(empJobs);
  }, [empJobs]);

  if (!empJobs || empJobLoading) return <Loader mode="inline" />;

  return (
    <main>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Manage Jobs</h1>
            <p className="text-muted-foreground mt-2">
              Create, edit and manage your job postings
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link href="/employer/jobs/create">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 h-11">
                <Plus className="w-5 h-5" />
                Create New Job
              </Button>
            </Link>
          </motion.div>
        </div>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id}>
                <Card className="border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col rounded-xl overflow-hidden h-full">
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Status row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="text-base font-semibold text-foreground line-clamp-2 flex-1">
                        {job.job_title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge
                          className={`${getStatusColor(job.status as string)} border text-[11px] rounded-sm`}
                        >
                          {job.status}
                        </Badge>
                        <Select
                          value={job.status || ""}
                          onValueChange={(newStatus) =>
                            handleChangeJobStatus(job.id, newStatus)
                          }
                          disabled={updatingStatusJobId === job.id}
                        >
                          <SelectTrigger className="h-7 w-[90px] text-xs">
                            <SelectValue placeholder="Change" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Type badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {[
                        formatLabel(job.category ?? "N/A"),
                        formatLabel(job.employment_type ?? "N/A"),
                        formatLabel(job.experience_level ?? "N/A"),
                        formatLabel(job.status ?? "N/A"),
                      ].map((label) => (
                        <Badge
                          key={label}
                          className="text-[11px] px-2 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border"
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex gap-3 items-center  mb-4 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-primary/70 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3 text-primary/70 flex-shrink-0" />
                        <span>{job.experience_level}</span>
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="text-sm font-semibold text-primary mb-4 pb-3 border-b border-border">
                      {formatSalary(
                        job.salary_min as number,
                        job.salary_max as number,
                        job.currency as string,
                      )}
                    </div>

                    {/* Positions + Deadline */}
                    <div className="grid grid-cols-2 gap-3 mb-4 pb-3 border-b border-border">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                          Positions
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3 h-3 text-primary/70" />
                          <span className="text-sm font-semibold text-foreground">
                            {job.open_positions} Open
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                          Deadline
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-primary/70" />
                          <span className="text-sm font-semibold text-foreground">
                            {new Date(
                              job.application_deadline as string,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <Link
                        href={`/employer/jobs/${job.job_slug}/edit`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-border hover:bg-muted text-xs"
                        >
                          <Edit2 className="w-3.5 h-3.5 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Link
                        href={`/employer/jobs/${job.job_slug}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-border hover:bg-muted text-xs"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive text-xs transition-colors"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        {isDeletingJob && jobToDelete === job.id ? (
                          <LoaderCircle className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Delete
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <NoJobsFound isEmployer={true} />
        )}
      </div>
    </main>
  );
};

export default ManageJobsPage;
