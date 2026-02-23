import { Card } from "@/components/ui/card";
import { Briefcase, CheckCircle, EyeIcon, Users } from "lucide-react";

const StatsCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-10">
        {/* Active Jobs Card */}
        <Card className="p-4 lg:p-6 bg-background border border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs lg:text-sm text-muted-foreground mb-1">
                Active Jobs
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">
                5
              </p>
            </div>
            <Briefcase className="w-4 lg:w-5 h-4 lg:h-5 text-muted-foreground" />
          </div>
          <p className="text-xs lg:text-sm text-green-600">↑ 2 this week</p>
        </Card>

        {/* Total Applicants Card */}
        <Card className="p-4 lg:p-6 bg-background border border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs lg:text-sm text-muted-foreground mb-1">
                Total Applicants
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">
                148
              </p>
            </div>
            <Users className="w-4 lg:w-5 h-4 lg:h-5 text-muted-foreground" />
          </div>
          <p className="text-xs lg:text-sm text-green-600">↑ 23 new</p>
        </Card>

        {/* Profile Views Card */}
        <Card className="p-4 lg:p-6 bg-background border border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs lg:text-sm text-muted-foreground mb-1">
                Profile Views
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">
                1.2k
              </p>
            </div>
            <EyeIcon className="w-4 lg:w-5 h-4 lg:h-5 text-muted-foreground" />
          </div>
          <p className="text-xs lg:text-sm text-green-600">↑ 8% vs last week</p>
        </Card>

        {/* Hired This Month Card */}
        <Card className="p-4 lg:p-6 bg-background border border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs lg:text-sm text-muted-foreground mb-1">
                Hired This Month
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-foreground">
                4
              </p>
            </div>
            <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-muted-foreground" />
          </div>
          <p className="text-xs lg:text-sm text-red-600">↓ 1 vs last month</p>
        </Card>
      </div>
    </>
  );
};

export default StatsCard;
