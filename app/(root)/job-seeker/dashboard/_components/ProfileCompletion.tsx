import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetJobSeekerProfile } from "@/hooks/useJobSeeker";
import { JobSeekerProfile } from "@/types/job-seeker";
import {
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Edit3,
  FileText,
  GraduationCap,
  LucideIcon,
  Plus,
  User,
} from "lucide-react";
import Link from "next/link";

const profileTabs: {
  id: string;
  label: string;
  fields: (keyof JobSeekerProfile)[];
  icon: LucideIcon;
}[] = [
  {
    id: "about",
    label: "About",
    fields: ["headline", "about", "profile_url"],
    icon: User,
  },
  {
    id: "experience",
    label: "Experience",
    fields: ["experience"],
    icon: Briefcase,
  },
  {
    id: "education",
    label: "Education",
    fields: ["education"],
    icon: GraduationCap,
  },
  {
    id: "skills",
    label: "Skills",
    fields: ["skills"],
    icon: Edit3,
  },
  {
    id: "preferences",
    label: "Job Preferences",
    fields: ["desired_role", "preferred_locations"],
    icon: Briefcase,
  },
  {
    id: "documents",
    label: "Documents",
    fields: ["resume_url", "portfolio_url"],
    icon: FileText,
  },
];

const ProfileCompletion = () => {
  const { data: jobSeekerProfile } = useGetJobSeekerProfile();

  const isSectionCompleted = (fields: (keyof JobSeekerProfile)[]) => {
    return fields.some((field) => {
      const value = jobSeekerProfile?.[field];
      if (value === null || value === undefined) return false;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "string") return value.trim() !== "";
      return true;
    });
  };

  const progress = jobSeekerProfile?.profile_completion ?? 0;

  return (
    <Card className="p-4 lg:p-6 bg-background border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm lg:text-base font-bold text-foreground">
          Profile Completion
        </h3>
        <span className="text-sm font-semibold text-primary">{progress}%</span>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2 mb-4" />

      {/* Profile Sections */}
      <div className="space-y-3 mb-4">
        {profileTabs.map((tab, idx) => {
          const completed = isSectionCompleted(tab.fields);
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    completed
                      ? "bg-green-100 text-green-600"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <tab.icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-xs lg:text-sm ${
                    completed
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </div>
              {completed ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Link href={`/job-seeker/${jobSeekerProfile?.slug}`}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-primary hover:bg-primary/10 h-7"
                  >
                    Add <Plus className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Link */}
      <Link
        href={`/job-seeker/profile/${jobSeekerProfile?.slug}`}
        className="block"
      >
        <Button
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Complete Profile
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </Link>
    </Card>
  );
};

export default ProfileCompletion;
