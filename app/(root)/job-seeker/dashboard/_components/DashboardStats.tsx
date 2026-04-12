"use client";

import { Card } from "@/components/ui/card";
import { useGetJobSeekerApplicationStats } from "@/hooks/useDashboard";
import {
  Clock,
  Eye,
  FileText,
  Heart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const DashboardStats = ({
  isSubscribed,
  isAcceleratorPlan,
}: {
  isSubscribed: boolean;
  isAcceleratorPlan: boolean;
}) => {
  const { data } = useGetJobSeekerApplicationStats();
  const thisWeekApplications = data?.thisWeekApplications ?? 0;
  const totalProfileViews = data?.thisWeekProfileviews ?? 0;

  const thisMonthSavedJobs = data?.thisMonthSavedJobs ?? 0;
  const upcomingInteview = data?.thisWeekUpcomingInterview ?? 0;

  const statsData = [
    {
      id: "applications-sent",
      title: "Applications Sent",
      value: thisWeekApplications,
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
      id: "saved-jobs",
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
      value: upcomingInteview,
      change:
        upcomingInteview > 0
          ? `+${upcomingInteview} this ween`
          : "No applications this ween",
      arrowIcon: upcomingInteview > 0 ? TrendingUp : TrendingDown,
      arrowColor: upcomingInteview > 0 ? "text-green-600" : "text-red-600",
      icon: Clock,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      id: "profile-views",
      title: "Profile Views",
      value: totalProfileViews,
      change:
        totalProfileViews > 0
          ? `+${totalProfileViews} this week`
          : "No views this week",
      arrowIcon: totalProfileViews > 0 ? TrendingUp : TrendingDown,
      arrowColor: totalProfileViews > 0 ? "text-green-600" : "text-red-600",
      icon: Eye,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  const filteredStats = statsData.filter((stat) => {
    if (!isSubscribed && stat.id === "profile-views") return false;
    if (isSubscribed && !isAcceleratorPlan && stat.id === "profile-views")
      return false;
    return true;
  });

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${
        filteredStats.length === 2
          ? "lg:grid-cols-2"
          : filteredStats.length === 3
            ? "lg:grid-cols-3"
            : "lg:grid-cols-4"
      } gap-4 lg:gap-6`}
    >
      {filteredStats.map((stat, index) => (
        <Card
          key={index}
          className={`p-4 lg:p-6 bg-background border border-border hover:shadow-md transition-shadow duration-200 ${statsData.length === 2 ? "w-full" : ""}`}
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
