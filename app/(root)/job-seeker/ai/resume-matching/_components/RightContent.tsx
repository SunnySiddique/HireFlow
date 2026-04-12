import { cn } from "@/lib/utils";
import { AICareerAnalysisResult, JobMatch } from "@/types/aiJobseeker";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  MapPin,
  RefreshCw,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CircularFitScore = ({
  score,
  colorClass,
  strokeClass,
}: {
  score: number;
  colorClass: string;
  strokeClass: string;
}) => {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
      <svg className="transform -rotate-90 w-24 h-24">
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-muted"
        />
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          strokeLinecap="round"
          className={strokeClass}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={cn("text-2xl font-bold font-mono", colorClass)}>
          {score}%
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
          Fit
        </span>
      </div>
    </div>
  );
};

function getScoreColors(score: number) {
  if (score >= 80)
    return { colorClass: "text-green-500", strokeClass: "text-green-500" };
  if (score >= 60)
    return { colorClass: "text-primary", strokeClass: "text-primary" };
  return { colorClass: "text-secondary", strokeClass: "text-secondary" };
}

const RightContent = ({ result }: { result: AICareerAnalysisResult }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "≥80%", "≥60%", "<60%"];

  const jobs = result.job_matches.map((job: JobMatch) => ({
    id: job.job_id,
    title: job.job_title,
    job_slug: job.job_slug,
    company: job.company,
    location: job.location,
    score: job.fit_score,
    why: job.why_this_match,
    strengths: job.strengths,
    gaps: job.skill_gaps,
    applyRecommendation: job.apply_recommendation,
    fitReasonBreakdown: job.fit_reason_breakdown,
    learningPath: job.learning_path.map((lp) => ({
      title: lp.skill,
      duration: lp.time,
      resource: lp.resource,
    })),
    ...getScoreColors(job.fit_score),
  }));

  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === "≥80%") return job.score >= 80;
    if (activeFilter === "≥60%") return job.score >= 60 && job.score < 80;
    if (activeFilter === "<60%") return job.score < 60;
    return true;
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Your AI Job Matches
            </h2>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Sorted by Fit Score based on your profile
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all text-sm font-bold w-fit">
            <RefreshCw className="w-4 h-4" />
            Regenerate
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-mono font-medium border transition-all",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                  : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {filteredJobs.map((job, index: number) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-card border transition-all duration-300 hover:shadow-lg group flex flex-col gap-5"
          >
            {/* Card Top: Info & Score */}
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  {job.applyRecommendation && (
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider",
                        job.applyRecommendation === "YES"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : job.applyRecommendation === "MAYBE"
                            ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            : "bg-red-500/10 text-red-500 border border-red-500/20",
                      )}
                    >
                      {job.applyRecommendation}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono mb-4">
                  <span className="flex items-center gap-1.5 text-foreground font-medium">
                    <Briefcase className="w-4 h-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold text-foreground mr-2">
                      Why This Match:
                    </span>
                    <span className="text-muted-foreground">{job.why}</span>
                  </p>
                </div>
              </div>

              {/* Fit Score Circle */}
              <div className="flex sm:flex-col items-center justify-center gap-2 sm:pl-6 sm:border-l border-border/50">
                <CircularFitScore
                  score={job.score}
                  colorClass={job.colorClass}
                  strokeClass={job.strokeClass}
                />
              </div>
            </div>

            {/* Strengths & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Strengths
                </p>
                <div className="flex flex-col gap-2">
                  {job.strengths.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {job.gaps.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Skill Gaps
                  </p>
                  <div className="flex flex-col gap-2">
                    {job.gaps.map((g) => (
                      <div
                        key={g}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <XCircle className="w-4 h-4 text-destructive shrink-0" />
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Expanded Details */}

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 pt-5 border-t border-border/50 flex flex-col gap-6"
            >
              {/* Fit Reason Breakdown */}
              {job.fitReasonBreakdown && (
                <div>
                  <h4 className="font-bold text-sm mb-3">
                    Detailed Fit Analysis
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                      <p className="text-xs font-bold text-foreground mb-1">
                        Skill Match
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {job.fitReasonBreakdown.skill_match}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                      <p className="text-xs font-bold text-foreground mb-1">
                        Experience Match
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {job.fitReasonBreakdown.experience_match}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                      <p className="text-xs font-bold text-foreground mb-1">
                        Responsibility Match
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {job.fitReasonBreakdown.responsibility_match}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/50">
                      <p className="text-xs font-bold text-destructive mb-1">
                        Risk Factors
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {job.fitReasonBreakdown.risk_factors}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Learning Path */}
              {job.learningPath && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h4 className="font-bold text-sm">
                      Recommended Learning Path
                    </h4>
                    <span className="text-xs text-muted-foreground font-mono ml-2">
                      Estimated: 2-4 weeks
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 relative before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-border">
                    {job.learningPath.map((step, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 relative z-10"
                      >
                        <div className="w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[10px] font-bold text-primary font-mono">
                          {i + 1}
                        </div>
                        <div className="flex-1 p-3 rounded-xl bg-muted/30 border border-border/50 flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-primary">
                              {step.title}
                            </span>
                            <span className="text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {step.resource}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50 mt-2">
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-foreground hover:bg-muted transition-colors">
                View Full Analysis
              </button>
              <Link
                href={`/job-seeker/jobs/${job.job_slug}`}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 shadow-md shadow-primary/20 transition-all flex items-center gap-2 group"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default RightContent;
