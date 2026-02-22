"use client";

import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEmployerProfile } from "@/hooks/useEmployer";
import { useDeleteJob, useGetEmployerJobs } from "@/hooks/useJobs";
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
import { useState } from "react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-green-50 text-green-700 border-green-200";
    case "Closed":
      return "bg-red-50 text-red-700 border-red-200";
    case "Draft":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const formatSalary = (min: number, max: number, currency: string) => {
  const format = (num: number) => `$${(num / 1000).toFixed(0)}k`;
  return `${format(min)} - ${format(max)} ${currency}`;
};

const ManageJobsPage = () => {
  const { data: employerProfile, isLoading: isEmployerProfileLoading } =
    useEmployerProfile();

  const { data: empJobs, isLoading: empJobLoading } = useGetEmployerJobs(
    employerProfile?.id as string,
  );

  const { mutateAsync: deleteJobPost, isPending: isDeletingJob } =
    useDeleteJob();
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const handleDeleteJob = async (jobSlug: string) => {
    setJobToDelete(jobSlug);
    await deleteJobPost(jobSlug, {
      onSettled: () => {
        setJobToDelete(null);
      },
    });
  };

  if (!empJobs) return <Loader />;

  if (isEmployerProfileLoading || empJobLoading) return <Loader />;
  return (
    <main>
      <div>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Manage Jobs</h1>
            <p className="text-muted-foreground mt-2">
              Create, edit and manage your job postings
            </p>
          </div>
          <Link href="/employer/jobs/create">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 h-11">
              <Plus className="w-5 h-5" />
              Create New Job
            </Button>
          </Link>
        </div>

        {/* Jobs Grid */}
        {empJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {empJobs.map((job) => (
              <Card
                key={job.id}
                className="border-border bg-card hover:shadow-lg transition-shadow duration-300 flex flex-col rounded-xl overflow-hidden"
              >
                <div className="p-6 flex-1 flex flex-col">
                  {/* Card Header with Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground line-clamp-2">
                        {job.job_title}
                      </h3>
                    </div>
                    <Badge
                      className={`${getStatusColor(job.status as string)} border`}
                    >
                      {job.status}
                    </Badge>
                  </div>

                  {/* Job Type and Employment Type */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="outline"
                      className="bg-accent border-border"
                    >
                      {job.job_type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-accent border-border"
                    >
                      {job.employment_type}
                    </Badge>
                  </div>

                  {/* Location and Remote Option */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>

                  {/* Experience Level */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.experience_level}</span>
                  </div>

                  {/* Salary Range */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4 pt-2 border-t border-border">
                    <span className="text-primary">
                      {formatSalary(
                        job.salary_min as number,
                        job.salary_max as number,
                        job.currency as string,
                      )}
                    </span>
                  </div>

                  {/* Open Positions and Deadline */}
                  <div className="grid grid-cols-2 gap-3 mb-6 pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Positions
                      </p>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="font-semibold text-foreground">
                          {job.open_positions} Open
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Deadline
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        <span className="font-semibold text-foreground text-sm">
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

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto pt-4 border-t border-border">
                    <Link href={`/employer/jobs/${job.job_slug}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-border hover:bg-muted"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/employer/jobs/${job.job_slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-border hover:bg-muted"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteJob(job.job_slug)}
                    >
                      {isDeletingJob && jobToDelete === job.job_slug ? (
                        <LoaderCircle className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center mb-6">
              <Briefcase className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No jobs created yet
            </h3>
            <p className="text-muted-foreground text-center mb-8 max-w-sm">
              Start by creating your first job posting to attract qualified
              candidates
            </p>
            <Link href="/employer/jobs/create">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Create Your First Job
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default ManageJobsPage;
