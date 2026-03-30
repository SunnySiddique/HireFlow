import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, Zap } from "lucide-react";

interface StatsCardsProps {
  stats: {
    total: number;
    scheduled: number;
    completed: number;
    inProgress: number;
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
      label: "Scheduled",
      value: stats.scheduled,
      icon: Clock,
      color: "bg-secondary/10 text-secondary",
      trend: "+3",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "bg-accent/20 text-foreground",
      trend: "+1",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: Zap,
      color: "bg-orange-100/50 text-orange-600",
      trend: "Live",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
