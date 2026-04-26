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
import {
  useDeleteJob,
  useEmployerJobs,
  useUpdateJobStatus,
} from "@/hooks/jobs/useEmployerJobs";
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
      return "bg-green-500/10 text-green-600 border-green-500/20 ring-1 ring-green-500/10";
    case "closed":
      return "bg-red-500/10 text-red-600 border-red-500/20 ring-1 ring-red-500/10";
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 ring-1 ring-yellow-500/10";
    default:
      return "bg-muted/50 text-muted-foreground border-border ring-1 ring-border/20";
  }
};

const ManageJobsPage = () => {
  const { mutateAsync: updateStatus } = useUpdateJobStatus();
  const { data: empJobs, isLoading: empJobLoading } = useEmployerJobs();
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-foreground">Manage Jobs</h1>
            <p className="text-muted-foreground mt-2">
              Create, edit and manage your job postings
            </p>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href="/employer/jobs/create">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 flex items-center gap-2 h-11 px-6 rounded-lg font-medium transition-all duration-300">
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-5 h-5" />
                </motion.div>
                Create New Job
              </Button>
            </Link>
          </motion.div>
        </div>

        {jobs.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="p-0 border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col rounded-xl overflow-hidden h-full group-hover:bg-card/95">
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Status row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <motion.h3
                        className="text-base font-semibold text-foreground line-clamp-2 flex-1 group-hover:text-primary transition-colors duration-200"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {job.job_title}
                      </motion.h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            className={`${getStatusColor(job.status as string)} border text-[11px] rounded-sm transition-all duration-200 hover:shadow-sm`}
                          >
                            {job.status}
                          </Badge>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Select
                            value={job.status || ""}
                            onValueChange={(newStatus) =>
                              handleChangeJobStatus(job.id, newStatus)
                            }
                            disabled={updatingStatusJobId === job.id}
                          >
                            <SelectTrigger className="h-7 w-[90px] text-xs hover:border-primary/40 transition-colors">
                              <SelectValue placeholder="Change" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </motion.div>
                      </div>
                    </div>

                    {/* Type badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {[
                        formatLabel(job.category ?? "N/A"),
                        formatLabel(job.employment_type ?? "N/A"),
                        formatLabel(job.experience_level ?? "N/A"),
                      ].map((label, idx) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge className="text-[11px] px-2 py-0.5 rounded-sm bg-muted/60 text-muted-foreground border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 cursor-default">
                            {label}
                          </Badge>
                        </motion.div>
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
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Link
                          href={`/employer/jobs/${job.job_slug}/edit`}
                          className="block"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-border hover:bg-primary/5 hover:border-primary/40 hover:text-primary text-xs transition-all duration-200"
                          >
                            <Edit2 className="w-3.5 h-3.5 mr-1" />
                            Edit
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Link
                          href={`/employer/jobs/${job.job_slug}`}
                          className="block"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-border hover:bg-primary/5 hover:border-primary/40 hover:text-primary text-xs transition-all duration-200"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            View
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive hover:text-destructive text-xs transition-all duration-200"
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
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <NoJobsFound isEmployer={true} />
        )}
      </div>
    </main>
  );
};

export default ManageJobsPage;
