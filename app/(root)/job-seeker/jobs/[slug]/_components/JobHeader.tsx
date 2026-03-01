import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { useState } from "react";
import { fadeUp, stagger } from "./animation";

const HeaderCard = ({ job }: { job: Job }) => {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Card className="p-6 lg:p-8 bg-background border border-border overflow-hidden relative">
          {/* Decorative top bar */}
          <motion.div
            className="absolute top-0 left-0 h-[3px] bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
              >
                {job.job_title}
              </motion.h1>

              {/* Badges */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="flex flex-wrap gap-2 mb-4"
              >
                {[
                  formatLabel(job.category),
                  formatLabel(job.employment_type),
                  formatLabel(job.experience_level),
                  formatLabel(job.status),
                ].map((b) => (
                  <motion.div key={b} variants={fadeUp}>
                    <Badge className="bg-background border border-border text-muted-foreground rounded-sm hover:border-primary/40 transition-colors">
                      {b}
                    </Badge>
                  </motion.div>
                ))}
                <motion.div variants={fadeUp}>
                  <Badge
                    className={`rounded-sm ${job.status === "open" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-muted border border-border text-muted-foreground"}`}
                  >
                    {formatLabel(job.status)}
                  </Badge>
                </motion.div>
              </motion.div>

              {/* Meta row */}
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
                    text: `${formatSalary(job.salary_min, job.salary_max, job.currency)}`,
                  },
                  { icon: Users, text: `${job.open_positions} open positions` },
                  {
                    icon: CalendarX,
                    text: `Deadline: ${formatDeadline(job.application_deadline)}`,
                  },
                ].map(({ icon: Icon, text }) => (
                  <motion.div
                    key={text}
                    variants={fadeUp}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{text}</span>
                  </motion.div>
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
              <Button
                className="bg-primary/50 text-primary-foreground opacity-50 cursor-not-allowed line-through"
                disabled
              >
                Apply Now
              </Button>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className={`border-border transition-all duration-200 ${saved ? "border-primary/50 text-primary bg-primary/5" : "text-foreground hover:bg-muted"}`}
                  onClick={() => setSaved((s) => !s)}
                >
                  {saved ? (
                    <BookmarkCheck className="w-4 h-4 mr-2" />
                  ) : (
                    <Bookmark className="w-4 h-4 mr-2" />
                  )}
                  {saved ? "Saved" : "Save Job"}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default HeaderCard;
