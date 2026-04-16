import { EmployerDashboardStatId, JobSeekerDashboardStatId } from "@/types";
import {
  BarChart3,
  Briefcase,
  Clock,
  Eye,
  EyeIcon,
  FileText,
  Heart,
  LucideIcon,
  Users,
} from "lucide-react";

export const DASHBOARD_STATS_CONFIG: Record<
  JobSeekerDashboardStatId,
  {
    title: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
  }
> = {
  applications: {
    title: "Applications Sent",
    icon: FileText,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  "saved-jobs": {
    title: "Saved Jobs",
    icon: Heart,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
  },
  interviews: {
    title: "Interview Scheduled",
    icon: Clock,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-50",
  },
  "profile-views": {
    title: "Profile Views",
    icon: Eye,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
};

export const EMPLOYER_STATS_CONFIG: Record<
  EmployerDashboardStatId,
  {
    title: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
  }
> = {
  "active-jobs": {
    title: "Active Jobs",
    icon: Briefcase,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  applicants: {
    title: "Total Applicants",
    icon: Users,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  "profile-views": {
    title: "Profile Views",
    icon: EyeIcon,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  "job-views": {
    title: "Job Views",
    icon: BarChart3,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
};
