"use client";

import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useDeleteAllRecommendedJobs,
  useDeleteRecommendedJob,
  useGetAllSaveRecommendedJobs,
} from "@/hooks/jobs/useAiRecommendedJobs";
import { useSavedJob, useSeekerSavedJobs } from "@/hooks/jobs/useSeekerJob";
import { cn, formatSalary } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building2,
  DollarSign,
  Loader2,
  MapPin,
  Sparkles,
  Trash,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AIMatchedJobsPage() {
  const { data: jobs = [], isLoading } = useGetAllSaveRecommendedJobs();
  const { mutate: deleteAllJobs, isPending: isDeletingAll } =
    useDeleteAllRecommendedJobs();
  const { mutate: deleteJob, isPending: isDeletingJob } =
    useDeleteRecommendedJob();
  const { mutate: saveJob, isPending: isSaving } = useSavedJob();
  const { data } = useSeekerSavedJobs();
  const savedJobs = data?.saved_jobs ?? [];
  console.log("savedJobs", savedJobs);
  const router = useRouter();

  const [jobId, setJobId] = useState<string | null>(null);

  const handleSave = (jobId: string) => {
    setJobId(jobId);

    saveJob(jobId, {
      onSettled: () => {
        setJobId(null);
      },
    });
  };

  const handleDelete = (jobId: string) => {
    setJobId(jobId);
    deleteJob(jobId, {
      onSettled: () => {
        setJobId(null);
      },
    });
  };

  if (isLoading) return <Loader mode="inline" />;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">AI Matched Jobs</h1>
        {jobs.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            disabled={isDeletingAll}
            onClick={() => deleteAllJobs()}
            className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            {isDeletingAll ? "Clearing..." : "Clear all"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1">
        {jobs.length > 0 ? (
          jobs.map((item: any, idx) => {
            const isFeatured = item.score >= 95;
            const job = item.job;
            const salary =
              job.salary_min && job.salary_max
                ? formatSalary(job.salary_min, job.salary_max, job.currency)
                : "Not specified";
            const isSaved = savedJobs?.some((s) => s.job_id === job.id);
            console.log("jobId:", job.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="group h-full"
              >
                <Card
                  className={cn(
                    "relative h-full flex flex-col p-6 sm:p-8 rounded-[1.5rem] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden",
                    isFeatured
                      ? "border-2 border-amber-500/20 bg-card hover:border-amber-500/50 shadow-amber-500/5"
                      : "border border-border/50 bg-card hover:border-primary/30 hover:shadow-primary/5 shadow-sm",
                  )}
                >
                  {/* Featured decorations unchanged */}

                  <div className="pr-24 relative z-10">
                    <Link
                      href={`/job-seeker/jobs/${item.id}`}
                      className="block"
                    >
                      <h2 className="text-xl sm:text-2xl font-bold mb-2.5 leading-tight group-hover:text-primary transition-colors duration-300">
                        {job.job_title}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="p-1.5 bg-muted rounded-md text-foreground/70">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-foreground">
                        {job.employer?.company_name}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5 relative z-10">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent text-xs px-3 py-1 rounded-md font-bold shadow-none">
                      {item.score}% Match
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground border-transparent text-xs px-3 py-1 rounded-md font-medium"
                    >
                      {job.employment_type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground border-transparent text-xs px-3 py-1 rounded-md font-medium"
                    >
                      {new Date(item.created_at).toLocaleDateString()}
                    </Badge>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-y-5 gap-x-2 border-t border-border/50 pt-5 relative z-10">
                    <div className="group/stat">
                      <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                        <MapPin className="w-4 h-4 text-primary/70" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">
                          Location
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-foreground truncate pl-5.5">
                        {job.location}
                      </p>
                    </div>
                    <div className="group/stat">
                      <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                        <DollarSign className="w-4 h-4 text-primary/70" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">
                          Compensation
                        </span>
                      </div>
                      <p className="text-sm font-bold text-foreground truncate pl-5.5">
                        {salary}
                      </p>
                    </div>
                  </div>

                  {/* Why it's a match */}
                  <div className="p-5 bg-muted/30 border border-muted-foreground/10 rounded-xl space-y-3 relative z-10">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary/70" />
                      Why it&apos;s a match
                    </p>
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {item.why}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex items-center gap-3 pt-2 relative z-10">
                    <Link
                      href={`/job-seeker/jobs/${job.job_slug}`}
                      className="flex-1"
                    >
                      <Button
                        variant="default"
                        className="w-full font-bold rounded-xl h-11 border-border hover:border-primary/50 transition-all"
                      >
                        Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={isDeletingJob && jobId === job.id}
                      onClick={() => handleDelete(job.id)}
                      className="w-11 h-11 rounded-xl bg-card hover:bg-destructive/10 border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-all"
                    >
                      {isDeletingJob && jobId === job.id ? (
                        <Loader2 className="animate-spin w-4.5 h-4.5" />
                      ) : (
                        <Trash className="w-4.5 h-4.5" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-11 h-11 rounded-xl bg-card hover:bg-muted border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSave(job.id);
                      }}
                    >
                      {isSaving && jobId === job.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : isSaved ? (
                        <BookmarkCheck className="w-4.5 h-4.5" />
                      ) : (
                        <Bookmark className="w-4.5 h-4.5" />
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-8 text-center col-span-full">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-muted border border-border flex items-center justify-center">
                <Briefcase className="w-9 h-9 text-muted-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-foreground mb-2">
              No matched jobs yet
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[300px] mb-7">
              Your AI-matched job recommendations will appear here once your
              profile is complete.
            </p>

            <Button
              onClick={() => router.push("/job-seeker/ai/resume-matching")}
              variant="outline"
              className="gap-2 font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Generate recommendations
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              Make sure your resume and skills are up to date.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
