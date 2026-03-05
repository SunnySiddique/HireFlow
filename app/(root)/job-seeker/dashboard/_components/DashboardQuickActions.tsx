import { Card } from "@/components/ui/card";
import { FileText, Heart, Search, Settings, User } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "Find Jobs",
    description: "Search for new opportunities",
    icon: Search,
    href: "/job-seeker/jobs",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Saved Jobs",
    description: "View bookmarked positions",
    icon: Heart,
    href: "/job-seeker/saved-jobs",
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "My Profile",
    description: "Manage your profile",
    icon: User,
    href: "/job-seeker/profile",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "Applications",
    description: "Track your applications",
    icon: FileText,
    href: "/job-seeker/applications",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    title: "Settings",
    description: "Account preferences",
    icon: Settings,
    href: "/job-seeker/settings",
    bgColor: "bg-gray-50",
    iconColor: "text-gray-500",
  },
];

const DashboardQuickActions = () => {
  return (
    <div>
      <h3 className="text-xs lg:text-sm font-bold text-foreground mb-3 lg:mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Card className="p-3 lg:p-4 bg-background border border-border hover:border-primary cursor-pointer transition-all duration-200 hover:shadow-md group">
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg ${action.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
              >
                <action.icon
                  className={`w-5 lg:w-6 h-5 lg:h-6 ${action.iconColor}`}
                />
              </div>
              <p className="text-xs lg:text-sm font-semibold text-foreground mb-0.5">
                {action.title}
              </p>
              <p className="text-[10px] lg:text-xs text-muted-foreground">
                {action.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardQuickActions;
