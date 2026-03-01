"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Plus } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: "✨", text: "Reach qualified candidates" },
  { icon: "🎯", text: "Find the perfect fit for your team" },
  { icon: "⚡", text: "Quick and easy hiring process" },
];

const NoJobsFound = ({ isEmployer = true }: { isEmployer: boolean }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Icon */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative w-24 h-24 bg-gradient-to-br from-primary/10 to-muted rounded-full flex items-center justify-center border-2 border-primary/20"
              whileHover={{ scale: 1.08, rotate: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Briefcase className="w-12 h-12 text-primary" />
            </motion.div>
          </div>
        </motion.div>

        {/* Heading + description */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-foreground">No Jobs Yet</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Start building your team by creating your first job posting. Post
            engaging job listings and attract top talent.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 pt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
        >
          {isEmployer && (
            <Link href="/employer/jobs/create" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md font-semibold flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create Job Posting
                </Button>
              </motion.div>
            </Link>
          )}
          <Link href="/browse-jobs" className="flex-1">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                className="w-full border-border text-foreground hover:bg-muted h-11 rounded-md font-semibold flex items-center justify-center gap-2 group"
              >
                Browse Jobs
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          className="pt-8 border-t border-border/50 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Why post a job?
          </p>
          <div className="grid grid-cols-1 gap-3">
            {features.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 text-sm text-foreground px-4 py-2.5 rounded-lg border  hover:border-border hover:bg-muted border-border transition-colors duration-200 cursor-default"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.45 + i * 0.08,
                  ease: "easeOut",
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoJobsFound;
