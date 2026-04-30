"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DASHBOARD_STATS_CONFIG } from "@/constants/dashboard.config";
import { useSeekerApplicationStats } from "@/hooks/stats/useStats";
import { createStatsData } from "@/lib/dashboard/stats-data";
import { TrendingDown, TrendingUp } from "lucide-react";

const DashboardStats = ({
  isSubscribed,
  isAcceleratorPlan,
}: {
  isSubscribed: boolean;
  isAcceleratorPlan: boolean;
}) => {
  const { data, isLoading } = useSeekerApplicationStats();

  const stats = createStatsData({
    weeklyApplications: data?.weeklyApplications ?? 0,
    monthlySavedJobs: data?.monthlySavedJobs ?? 0,
    weeklyInterviews: data?.weeklyInterviews ?? 0,
    weeklyProfileViews: data?.weeklyProfileViews ?? 0,
  });

  const statsData = stats.map((stat) => {
    const config = DASHBOARD_STATS_CONFIG[stat.id];

    return {
      ...stat,
      title: config.title,
      icon: config.icon,
      iconBg: config.iconBg,
      iconColor: config.iconColor,
      arrowIcon: stat.trend === "up" ? TrendingUp : TrendingDown,
      arrowColor: stat.trend === "up" ? "text-green-600" : "text-red-600",
    };
  });

  const filteredStats = statsData.filter((stat) => {
    if (!isSubscribed && stat.id === "profile-views") return false;
    if (isSubscribed && !isAcceleratorPlan && stat.id === "profile-views")
      return false;
    return true;
  });

  const skeletonCount = isSubscribed && isAcceleratorPlan ? 4 : 3;
  const gridCols =
    skeletonCount === (2 as 3 | 4)
      ? "lg:grid-cols-2"
      : skeletonCount === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-4";

  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-4 lg:gap-6`}
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton key={i} className="h-30 lg:h-35 rounded-xl" />
        ))}
      </div>
    );
  }

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
