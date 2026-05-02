"use client";

import { Card } from "@/components/ui/card";
import { EMPLOYER_STATS_CONFIG } from "@/constants/dashboard.config";
import { createEmployerStatsData } from "@/lib/dashboard/stats-data";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatsCardProps {
  data?: {
    totalActiveJobs: number | null;
    weeklyApplicants: number | null;
    totalProfileViews: number | null;
    weeklyJobViews: number | null;
  };
}

const StatsCard = ({ data }: StatsCardProps) => {
  console.log(data);
  const stats = createEmployerStatsData({
    totalActiveJobs: data?.totalActiveJobs ?? 0,
    weeklyApplicants: data?.weeklyApplicants ?? 0,
    totalProfileViews: data?.totalProfileViews ?? 0,
    weeklyJobViews: data?.weeklyJobViews ?? 0,
  });

  const statsData = stats.map((stat) => {
    const config = EMPLOYER_STATS_CONFIG[stat.id];

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

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-10">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        const ArrowIcon = stat.arrowIcon;

        return (
          <Card
            key={stat.title}
            className="p-4 lg:p-6 bg-background border border-border"
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
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <Icon className={`w-4 lg:w-5 h-4 lg:h-5 ${stat.iconColor}`} />
              </div>
            </div>
            <div
              className={`flex items-center gap-1 text-xs lg:text-sm ${stat.arrowColor}`}
            >
              <ArrowIcon className="w-3 h-3" />
              <span>{stat.change}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCard;
