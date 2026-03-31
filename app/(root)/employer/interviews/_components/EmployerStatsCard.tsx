import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  Clock,
  HelpCircle,
  XCircle,
} from "lucide-react";

interface StatsCardsProps {
  stats: {
    total: number;
    upcoming: number;
    pending_confirm: number;
    cancelled: number;
    completed: number;
  };
}

const EmployerStatsCard = ({ stats }: StatsCardsProps) => {
  const cardData = [
    {
      label: "Total Interviews",
      value: stats.total,
      icon: Calendar,
      color: "bg-primary/10 text-primary",
      trend: "+12%",
    },
    {
      label: "Upcoming",
      value: stats.upcoming,
      icon: Clock,
      color: "bg-secondary/10 text-secondary",
      trend: "+3",
    },
    {
      label: "Pending Confirm",
      value: stats.pending_confirm,
      icon: HelpCircle,
      color: "bg-chart-3/30 text-chart-2",
      trend: "Awaiting",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "bg-chart-1/20 text-chart-1",
      trend: "+1",
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      color: "bg-destructive/10 text-destructive",
      trend: "—",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cardData.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={stat.label}
            className="border-border hover:shadow-md transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.trend} this week
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EmployerStatsCard;
