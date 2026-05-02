"use client";

import Pagination from "@/app/(root)/job-seeker/jobs/_components/Pagination";
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
import { cn, formatLabel, formatSalary } from "@/lib/utils";
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
  Star,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ManageJobsPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });
  const { data = { empJobs: [], totalCount: 0, totalPages: 0 }, isLoading } =
    useEmployerJobs(filters);
  const { mutateAsync: updateStatus, isPending: isStatusUpdating } =
    useUpdateJobStatus();
  const { mutateAsync: deleteJobPost, isPending: isDeletingJob } =
    useDeleteJob();

  const { empJobs, totalPages } = data;

  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>(empJobs || []);
  const [updatingStatusJobId, setUpdatingStatusJobId] = useState<string | null>(
    null,
  );

  const handleDeleteJob = async (jobId: string) => {
    setJobToDelete(jobId);

    const newJobs = jobs.filter((job) => job.id !== jobId);
    setJobs(newJobs);
    toast.success("Job deleted");
    if (newJobs.length === 0 && filters.page > 1) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
    await deleteJobPost(jobId, {
      onError: () => setJobs(empJobs),
      onSettled: () => setJobToDelete(null),
    });
  };

  const handleChangeJobStatus = async (jobId: string, newStatus: string) => {
    setUpdatingStatusJobId(jobId);

    try {
      await updateStatus({ jobId, status: newStatus });
    } catch {
      setJobs(empJobs);
    } finally {
      setUpdatingStatusJobId(null);
    }
  };

  useEffect(() => {
    if (empJobs) setJobs(empJobs);
  }, [empJobs]);

  if (isLoading) return <Loader mode="inline" />;

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <motion.div key={job.id} whileHover={{ y: -4 }} className="group">
                <Card
                  className={cn(
                    "relative p-0 h-full flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl",
                    job.is_featured
                      ? "bg-card border-2 border-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/10"
                      : "bg-card border border-border/50 hover:border-primary/30 hover:shadow-primary/5",
                  )}
                >
                  {/* Decorative Background Elements */}
                  {job.is_featured ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-50 z-0 pointer-events-none" />
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 opacity-80" />
                    </>
                  ) : (
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                  )}

                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    {/* Header (Title & Status) */}
                    <div className="flex justify-between items-start gap-4 mb-5">
                      <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                        {job.is_featured && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider w-fit shadow-sm">
                            <Star className="w-3 h-3 fill-amber-500" />
                            Featured
                          </div>
                        )}
                        <Link
                          href={`/employer/jobs/${job.job_slug}`}
                          className="block"
                        >
                          <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {job.job_title}
                          </h3>
                        </Link>
                      </div>
                      <div className="flex-shrink-0">
                        <Select
                          value={job.status || ""}
                          onValueChange={(newStatus) =>
                            handleChangeJobStatus(job.id, newStatus)
                          }
                          disabled={
                            isStatusUpdating && updatingStatusJobId === job.id
                          }
                        >
                          <SelectTrigger
                            className={cn(
                              "h-8 text-xs rounded-full border-none shadow-sm focus:ring-2 focus:ring-offset-1 px-3 font-bold transition-all w-[100px]",
                              job.status === "open"
                                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 ring-emerald-500/30"
                                : job.status === "closed"
                                  ? "bg-destructive/10 text-destructive hover:bg-destructive/20 ring-destructive/30"
                                  : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 ring-amber-500/30",
                            )}
                          >
                            {isStatusUpdating &&
                            updatingStatusJobId === job.id ? (
                              <LoaderCircle className="w-3 h-3 animate-spin mr-1" />
                            ) : null}
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-border shadow-xl">
                            <SelectItem
                              value="open"
                              className="font-medium text-emerald-600 focus:text-emerald-700 cursor-pointer"
                            >
                              Open
                            </SelectItem>
                            <SelectItem
                              value="pending"
                              className="font-medium text-amber-600 focus:text-amber-700 cursor-pointer"
                            >
                              Pending
                            </SelectItem>
                            <SelectItem
                              value="closed"
                              className="font-medium text-destructive focus:text-destructive-foreground cursor-pointer"
                            >
                              Closed
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Badges/Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {[
                        formatLabel(job.category ?? ""),
                        formatLabel(job.employment_type ?? ""),
                        formatLabel(job.experience_level ?? ""),
                      ].map(
                        (label, idx) =>
                          label &&
                          label !== "N/A" && (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-muted text-muted-foreground hover:bg-muted/80 border-transparent text-[11px] px-2.5 py-0.5 rounded-md font-medium transition-colors"
                            >
                              {label}
                            </Badge>
                          ),
                      )}
                    </div>

                    {/* Salary Display */}
                    <div className="mb-6">
                      <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                        Compensation
                      </p>
                      <p className="text-xl font-bold tracking-tight text-foreground flex items-center gap-1">
                        {formatSalary(
                          job.salary_min as number,
                          job.salary_max as number,
                          job.currency as string,
                        )}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-4 border-t border-border/50 mb-6">
                      <div className="group/stat">
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-1 transform group-hover/stat:translate-x-1 transition-transform">
                          <MapPin className="w-3.5 h-3.5 text-primary/70" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">
                            Location
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate pl-5">
                          {job.location}
                        </p>
                      </div>
                      <div className="group/stat">
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-1 transform group-hover/stat:translate-x-1 transition-transform">
                          <Briefcase className="w-3.5 h-3.5 text-primary/70" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">
                            Experience
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate pl-5">
                          {job.experience_level}
                        </p>
                      </div>
                      <div className="group/stat">
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-1 transform group-hover/stat:translate-x-1 transition-transform">
                          <Users className="w-3.5 h-3.5 text-primary/70" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">
                            Positions
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate pl-5">
                          {job.open_positions}
                        </p>
                      </div>
                      <div className="group/stat">
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-1 transform group-hover/stat:translate-x-1 transition-transform">
                          <Calendar className="w-3.5 h-3.5 text-primary/70" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">
                            Deadline
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground truncate pl-5">
                          {new Date(
                            job.application_deadline as string,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="flex items-center gap-2 mt-auto">
                      <Link
                        href={`/employer/jobs/${job.job_slug}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 rounded-xl h-10 font-bold group/btn shadow-sm"
                        >
                          <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          View
                        </Button>
                      </Link>
                      <Link
                        href={`/employer/jobs/${job.job_slug}/edit`}
                        className="flex-none"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-10 h-10 rounded-xl border-border hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-10 h-10 rounded-xl border-border hover:bg-destructive hover:text-destructive hover:border-destructive transition-all duration-300 shadow-sm"
                        onClick={() => handleDeleteJob(job.id)}
                        disabled={isDeletingJob && jobToDelete === job.id}
                      >
                        {isDeletingJob && jobToDelete === job.id ? (
                          <LoaderCircle className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <NoJobsFound isEmployer={true} />
        )}

        <Pagination
          page={filters.page}
          totalPages={totalPages}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
        />
      </div>
    </main>
  );
};

export default ManageJobsPage;
