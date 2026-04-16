import { JobSeekerDashboardStatId } from "@/types";

export const createStatsData = (params: {
  weeklyApplications: number;
  monthlySavedJobs: number;
  weeklyInterviews: number;
  weeklyProfileViews: number;
}) => {
  const data: {
    id: JobSeekerDashboardStatId;
    value: number;
    change: string;
    trend: "up" | "down";
  }[] = [
    {
      id: "applications",
      value: params.weeklyApplications,
      change:
        params.weeklyApplications > 0
          ? `+${params.weeklyApplications} this week`
          : "No applications this week",
      trend: params.weeklyApplications > 0 ? "up" : "down",
    },
    {
      id: "saved-jobs",
      value: params.monthlySavedJobs,
      change:
        params.monthlySavedJobs > 0
          ? `+${params.monthlySavedJobs} this month`
          : "No saved jobs this month",
      trend: params.monthlySavedJobs > 0 ? "up" : "down",
    },
    {
      id: "interviews",
      value: params.weeklyInterviews,
      change:
        params.weeklyInterviews > 0
          ? `+${params.weeklyInterviews} this week`
          : "No interviews this week",
      trend: params.weeklyInterviews > 0 ? "up" : "down",
    },
    {
      id: "profile-views",
      value: params.weeklyProfileViews,
      change:
        params.weeklyProfileViews > 0
          ? `+${params.weeklyProfileViews} this week`
          : "No views this week",
      trend: params.weeklyProfileViews > 0 ? "up" : "down",
    },
  ];

  return data;
};

import { EmployerDashboardStatId } from "@/types";

export const createEmployerStatsData = (params: {
  totalActiveJobs: number;
  weeklyApplicants: number;
  totalProfileViews: number;
  weeklyJobViews: number;
}) => {
  const data: {
    id: EmployerDashboardStatId;
    value: number;
    change: string;
    trend: "up" | "down";
  }[] = [
    {
      id: "active-jobs",
      value: params.totalActiveJobs,
      change:
        params.totalActiveJobs > 0
          ? `+${params.totalActiveJobs} this week`
          : "No active jobs this week",
      trend: params.totalActiveJobs > 0 ? "up" : "down",
    },
    {
      id: "applicants",
      value: params.weeklyApplicants,
      change:
        params.weeklyApplicants > 0
          ? `+${params.weeklyApplicants} new`
          : "No applicants this week",
      trend: params.weeklyApplicants > 0 ? "up" : "down",
    },
    {
      id: "profile-views",
      value: params.totalProfileViews,
      change:
        params.totalProfileViews > 0
          ? `+${params.totalProfileViews} new`
          : "No profile views this week",
      trend: params.totalProfileViews > 0 ? "up" : "down",
    },
    {
      id: "job-views",
      value: params.weeklyJobViews,
      change:
        params.weeklyJobViews > 0
          ? `+${params.weeklyJobViews} this week`
          : "No job views this week",
      trend: params.weeklyJobViews > 0 ? "up" : "down",
    },
  ];

  return data;
};
