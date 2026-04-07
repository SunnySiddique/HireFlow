import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { useState } from "react";

const LeftSidebar = ({
  extractedSkills,
  summary,
}: {
  extractedSkills: {
    technical: string[];
    soft: string[];
    experience_years: number;
    education: string;
  };
  summary: string;
}) => {
  const [activeTab, setActiveTab] = useState<"tech" | "soft">("tech");

  const techSkills = extractedSkills?.technical || [];
  const softSkills = extractedSkills?.soft || [];

  return (
    <aside className="w-full lg:w-[30%] shrink-0 flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 shadow-lg flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border/50">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Resume Snapshot</h2>
            <p className="text-xs text-muted-foreground font-mono">
              Last updated: Today
            </p>
          </div>
        </div>

        {/* Summary */}
        <div>
          <p className="text-sm leading-relaxed text-foreground/90 italic border-l-2 border-primary/50 pl-4 py-1">
            {summary || "No summary provided"}
          </p>
        </div>

        {/* Experience + Education (FULLY DYNAMIC) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
            <Award className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                Experience
              </p>
              <p className="text-sm font-bold">
                {extractedSkills?.experience_years ?? 0} Years Experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
            <GraduationCap className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                Education
              </p>
              <p className="text-sm font-bold">
                {extractedSkills?.education || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="pt-2">
          <h3 className="text-sm font-bold mb-4 flex items-center justify-between">
            Extracted Skills
            <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              AI Parsed
            </span>
          </h3>

          {/* Tabs */}
          <div className="flex p-1 bg-muted/50 rounded-lg mb-4 border border-border/50">
            <button
              onClick={() => setActiveTab("tech")}
              className={cn(
                "flex-1 text-xs font-bold py-1.5 rounded-md transition-all",
                activeTab === "tech"
                  ? "bg-card text-foreground shadow-sm border border-border/50"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Technical Skills
            </button>

            <button
              onClick={() => setActiveTab("soft")}
              className={cn(
                "flex-1 text-xs font-bold py-1.5 rounded-md transition-all",
                activeTab === "soft"
                  ? "bg-card text-foreground shadow-sm border border-border/50"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Soft Skills
            </button>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-2">
            {(activeTab === "tech" ? techSkills : softSkills).map(
              (skill: string, i: number) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono text-xs font-medium"
                >
                  {skill}
                </motion.span>
              ),
            )}
          </div>
        </div>
      </motion.div>
    </aside>
  );
};

export default LeftSidebar;
