import { BarChart3, Bell, Briefcase, Eye, Sparkles } from "lucide-react";

export const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "job_match":
      return <Briefcase className="w-4 h-4 text-blue-500" />;
    case "profile_view":
      return <Eye className="w-4 h-4 text-purple-500" />;
    case "job_view":
      return <BarChart3 className="w-4 h-4 text-green-500" />;
    case "system":
      return <Sparkles className="w-4 h-4 text-amber-500" />;
    default:
      return <Bell className="w-4 h-4 text-muted-foreground" />;
  }
};

export function getNotificationLink(
  type: string | null,
  referenceId: string | null,
  role: string,
) {
  if (!referenceId) return "";

  switch (type) {
    case "job_match":
      return `/job-seeker/jobs/${referenceId}`;
    case "job_view":
      return `/employer/jobs/${referenceId}`;
    case "profile_view":
      return role === "job-seeker"
        ? `/profile/company/${referenceId}`
        : `/profile/job-seeker/${referenceId}`;
    case "system":
      return `/job-seeker/${referenceId}`;
    default:
      return "";
  }
}

// category
export const categories = [
  {
    key: "all",
    label: "All Notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    key: "job_match",
    label: "Job Matches",
    icon: <Briefcase className="w-4 h-4" />,
  },

  {
    key: "profile_view",
    label: "Profile Views",
    icon: <Eye className="w-4 h-4" />,
  },
  {
    key: "job_view",
    label: "Job Views",
    icon: <BarChart3 className="w-4 h-4" />,
  },
];
