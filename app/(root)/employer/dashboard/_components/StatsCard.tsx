"use client";

import { Card } from "@/components/ui/card";
import { useGetEmployerApplicationStats } from "@/hooks/useDashboard";
import {
  Briefcase,
  CheckCircle,
  EyeIcon,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

const StatsCard = () => {
  const { data } = useGetEmployerApplicationStats();
  const totalActiveJobs = data?.totalActiveJobs ?? 0;
  const totalApplicants = data?.thisWeekApplicants ?? 0;

  const statsData = [
    {
      title: "Active Jobs",
      value: totalActiveJobs,
      change:
        totalActiveJobs > 0
          ? `+${totalActiveJobs} this week`
          : "No active jobs this week",
      arrowIcon: totalActiveJobs > 0 ? TrendingUp : TrendingDown,
      arrowColor: totalActiveJobs > 0 ? "text-green-600" : "text-red-600",
      icon: Briefcase,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Total Applicants",
      value: totalApplicants,
      change:
        totalApplicants > 0
          ? `+${totalApplicants} new`
          : "No applicants this week",
      arrowIcon: totalApplicants > 0 ? TrendingUp : TrendingDown,
      arrowColor: totalApplicants > 0 ? "text-green-600" : "text-red-600",
      icon: Users,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Profile Views",
      value: "1.2k",
      change: "↑ 8% vs last week",
      arrowIcon: TrendingUp,
      arrowColor: "text-green-600",
      icon: EyeIcon,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      title: "Hired This Month",
      value: 4,
      change: "↓ 1 vs last month",
      arrowIcon: TrendingDown,
      arrowColor: "text-red-600",
      icon: CheckCircle,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-10">
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
