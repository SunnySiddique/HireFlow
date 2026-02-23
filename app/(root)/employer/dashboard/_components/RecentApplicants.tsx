import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const recentApplicants = [
  {
    name: "Sarah Johnson",
    role: "Senior React Developer",
    time: "2h ago",
    initials: "SJ",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "Mike Chen",
    role: "UX/UI Designer",
    time: "4h ago",
    initials: "MC",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    name: "Emma Davis",
    role: "Product Manager",
    time: "6h ago",
    initials: "ED",
    gradient: "from-pink-400 to-pink-600",
  },
  {
    name: "Alex Rodriguez",
    role: "DevOps Engineer",
    time: "8h ago",
    initials: "AR",
    gradient: "from-green-400 to-green-600",
  },
  {
    name: "Lisa Wong",
    role: "Backend Developer",
    time: "1d ago",
    initials: "LW",
    gradient: "from-orange-400 to-orange-600",
  },
];

const RecentApplicants = () => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <h2 className="text-base lg:text-lg font-bold text-foreground">
            Recent Applicants
          </h2>
          <a
            href="#"
            className="text-primary hover:underline text-xs lg:text-sm"
          >
            View all →
          </a>
        </div>
        <Card className="bg-background border border-border p-3 lg:p-4 space-y-3 lg:space-y-4 mb-4 lg:mb-6">
          {recentApplicants.map((applicant, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 lg:p-3 hover:bg-muted rounded-md cursor-pointer transition"
            >
              <div className="flex items-center gap-2 lg:gap-3 flex-1">
                <Avatar
                  className={`h-8 lg:h-9 w-8 lg:w-9 bg-gradient-to-br ${applicant.gradient}`}
                >
                  <AvatarFallback className="text-white text-xs font-bold">
                    {applicant.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs lg:text-sm font-medium text-foreground">
                    {applicant.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {applicant.role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {applicant.time}
              </p>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
};

export default RecentApplicants;
