"use client";

import Loader from "@/components/Loader";
import { Card } from "@/components/ui/card";
import { useGetJobSeekerApplicationStats } from "@/hooks/useDashboard";
import {
  Clock,
  EyeIcon,
  FileText,
  Heart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const DashboardStats = () => {
  const { data, isLoading } = useGetJobSeekerApplicationStats();
  const totalApplications = data?.totalApplications ?? 0;
  const thisWeekApplications = data?.thisWeekApplications ?? 0;

  const thisMonthSavedJobs = data?.thisMonthSavedJobs ?? 0;

  const statsData = [
    {
      title: "Applications Sent",
      value: totalApplications,
      change:
        thisWeekApplications > 0
          ? `+${thisWeekApplications} this week`
          : "No applications this week",
      arrowIcon: thisWeekApplications > 0 ? TrendingUp : TrendingDown,
      arrowColor: thisWeekApplications > 0 ? "text-green-600" : "text-red-600",
      icon: FileText,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Saved Jobs",
      value: thisMonthSavedJobs,
      change:
        thisMonthSavedJobs > 0
          ? `+${thisMonthSavedJobs} this month`
          : "No applications this month",
      arrowIcon: thisMonthSavedJobs > 0 ? TrendingUp : TrendingDown,
      arrowColor: thisMonthSavedJobs > 0 ? "text-green-600" : "text-red-600",
      icon: Heart,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      title: "Interview Scheduled",
      value: "3",
      change: "2 this week",
      changeType: "neutral",
      icon: Clock,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Profile Views",
      value: "156",
      change: "+12% vs last week",
      changeType: "positive",
      icon: EyeIcon,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className="p-4 lg:p-6 bg-background border border-border hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs lg:text-sm text-muted-foreground mb-1">
                {stat.title}
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
            <div className={`p-2 lg:p-3 rounded-lg ${stat.iconBg}`}>
              <stat.icon
                className={`w-4 lg:w-5 h-4 lg:h-5 ${stat.iconColor}`}
              />
            </div>
          </div>
          <p
            className={`text-xs lg:text-sm flex items-center gap-1 ${
              stat.arrowColor
            }`}
          >
            {stat.arrowIcon && (
              <stat.arrowIcon className={`w-4 h-4 ${stat.arrowColor}`} />
            )}
            {stat.change}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
