import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  useApplyJob,
  useGetCurrentUserAppliedJobs,
  useGetCurrentUserSaveJobs,
  useSavedJob,
} from "@/hooks/useJobs";
import { formatDeadline, formatLabel, formatSalary } from "@/lib/utils";
import { Job } from "@/types/jobs";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  CalendarX,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { stagger } from "./animation";

const HeaderCard = ({
  job,
  isSubscribed,
}: {
  job: Job;
  isSubscribed: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const { mutate: applyJob, isPending: isApplying } = useApplyJob();
  const { mutate: saveJob } = useSavedJob();
  const { data: appliedJob } = useGetCurrentUserAppliedJobs();
  const { data: savedJobs } = useGetCurrentUserSaveJobs();

  const router = useRouter();

  const isApplied = appliedJob?.some(
    (applicant) => applicant.job_id === job.id,
  );
  const isSaved = savedJobs?.some((save) => save.job_id === job.id);

  const handleApplyJob = () => {
    applyJob(
      { jobId: job.id, coverLetter },
      {
        onSuccess: () => {
          setOpen(false);
          setCoverLetter("");
        },
      },
    );
  };

  const handleSaveJob = () => {
    saveJob(job.id);
  };

  return (
    <>
      <Card className="p-6 lg:p-8 bg-background border border-border overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-[3px] bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {job.job_title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                formatLabel(job.category as string),
                formatLabel(job.employment_type as string),
                formatLabel(job.experience_level as string),
              ].map((b) => (
                <div key={b}>
                  <Badge className="bg-background border border-border text-muted-foreground rounded-sm hover:border-primary/40 transition-colors">
                    {b}
                  </Badge>
                </div>
              ))}
              <div>
                <Badge
                  className={`rounded-sm ${job.status === "open" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-muted border border-border text-muted-foreground"}`}
                >
                  {formatLabel(job.status as string)}
                </Badge>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-muted-foreground"
            >
              {[
                { icon: MapPin, text: job.location },
                {
                  icon: DollarSign,
                  text: formatSalary(
                    job.salary_min as number,
                    job.salary_max as number,
                    job.currency as string,
                  ),
                },
                { icon: Users, text: `${job.open_positions} open positions` },
                {
                  icon: CalendarX,
                  text: `Deadline: ${formatDeadline(job.application_deadline as string)}`,
                },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex gap-2 flex-shrink-0 h-fit"
          >
            {isApplied ? (
              <Button disabled variant={"outline"}>
                Applied
              </Button>
            ) : (
              <Button
                className="bg-primary text-primary-foreground"
                onClick={() => setOpen(true)}
                disabled={isApplying}
              >
                Apply Now
              </Button>
            )}

            {isSubscribed && (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className={`border-border transition-all duration-200 ${isSaved ? "border-primary/50 text-primary bg-primary/5" : "text-foreground hover:bg-muted"}`}
                  onClick={handleSaveJob}
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Card>

      {/* ✅ Cover Letter Dialog */}
      {isSubscribed ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Apply for {job.job_title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Cover Letter{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                placeholder="Tell the employer why you're a great fit for this role..."
                className="min-h-[180px] resize-none"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                {coverLetter.length} characters
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyJob} disabled={isApplying}>
                {isApplying ? "Applying..." : "Submit Application"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Subscription Required 🔒</DialogTitle>
            </DialogHeader>

            <div className="space-y-2 text-center">
              <p className="text-sm font-medium text-foreground">
                You need a subscription to apply for this job.
              </p>
              <p className="text-xs text-muted-foreground">
                Subscribe now to unlock unlimited job applications and start
                applying today!
              </p>
              <Button
                variant="default"
                className="mt-2"
                onClick={() => router.push("/job-seeker/billing")}
              >
                View Subscription Plans
              </Button>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default HeaderCard;
