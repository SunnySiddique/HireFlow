import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar, CheckCircle, Clock } from "lucide-react";

const JobSeekerStatsCard = ({ mockInterviews }: { mockInterviews: any[] }) => {
  const stats = [
    {
      title: "Total Interviews",
      value: mockInterviews.length.toString(),
      icon: Briefcase,
      description: "All time",
    },
    {
      title: "Upcoming",
      value: mockInterviews
        .filter((i) => i.status === "upcoming")
        .length.toString(),
      icon: Calendar,
      description: "Scheduled",
    },
    {
      title: "Pending Confirm",
      value: mockInterviews
        .filter((i) => i.status === "pending_confirm")
        .length.toString(),
      icon: Clock,
      description: "Requires action",
    },
    {
      title: "Completed",
      value: mockInterviews
        .filter((i) => i.status === "completed")
        .length.toString(),
      icon: CheckCircle,
      description: "Past interviews",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4  pb-8 pt-5">
        {stats.map((stat, index) => (
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
