"use client";

import ApplicationCard from "@/components/jobs/ApplicationCard";
import Loader from "@/components/Loader";
import { appStatusConfig } from "@/constants/jobsData";
import { useGetCurrentUserAppliedJobs } from "@/hooks/useJobs";
import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";

const MyApplicationsPage = () => {
  const { data, isLoading } = useGetCurrentUserAppliedJobs();
  const applications = data ?? [];

  if (isLoading) return <Loader />;
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground mt-2">
          {applications.length} application
          {applications.length !== 1 ? "s" : ""} submitted
        </p>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="flex flex-wrap gap-2"
      >
        {Object.entries(appStatusConfig).map(([key, val]) => {
          const count = applications.filter(
            (a) => a.application_status === key,
          ).length;
          return (
            <div
              key={key}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${val.className}`}
            >
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              <span className="font-medium">{val.label}</span>
              <span className="font-bold">{count}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Grid */}
      {applications.length > 0 ? (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {applications.map((app) => (
            <ApplicationCard app={app} key={app.id} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center py-24 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative w-24 h-24 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center">
              <BriefcaseBusiness className="w-12 h-12 text-primary" />
            </div>
          </motion.div>
          <motion.h3
            className="text-2xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            No applications yet
          </motion.h3>
          <motion.p
            className="text-muted-foreground max-w-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.28 }}
          >
            Start applying to jobs and track your applications here.
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default MyApplicationsPage;
