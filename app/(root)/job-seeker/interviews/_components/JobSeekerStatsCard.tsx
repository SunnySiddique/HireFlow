import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, CheckCircle, Clock } from "lucide-react";

interface StatsCardsProps {
  stats: {
    total: number;
    upcoming: number;
    pending_confirm: number;
    cancelled: number;
    completed: number;
  };
}

const JobSeekerStatsCard = ({ stats }: StatsCardsProps) => {
  const cardData = [
    {
      title: "Total Interviews",
      value: stats.total,
      icon: Briefcase,
      description: "All time",
    },
    {
      title: "Upcoming",
      value: stats.upcoming,
      icon: Calendar,
      description: "Scheduled",
    },
    {
      title: "Pending Confirm",
      value: stats.pending_confirm,
      icon: Clock,
      description: "Requires action",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      description: "Past interviews",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4  pb-8 pt-5">
        {cardData.map((stat, index) => (
          <Card key={index} className="border-border shadow-sm">
            <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobSeekerStatsCard;
