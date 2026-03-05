import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Edit3,
  FileText,
  GraduationCap,
  Plus,
  User,
} from "lucide-react";
import Link from "next/link";

const profileSections = [
  {
    name: "Personal Info",
    completed: true,
    icon: User,
  },
  {
    name: "Work Experience",
    completed: true,
    icon: Briefcase,
  },
  {
    name: "Education",
    completed: true,
    icon: GraduationCap,
  },
  {
    name: "Skills",
    completed: false,
    icon: Edit3,
  },
  {
    name: "Resume",
    completed: false,
    icon: FileText,
  },
];

const ProfileCompletion = () => {
  const completedCount = profileSections.filter((s) => s.completed).length;
  const progress = (completedCount / profileSections.length) * 100;

  return (
    <Card className="p-4 lg:p-6 bg-background border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm lg:text-base font-bold text-foreground">
          Profile Completion
        </h3>
        <span className="text-sm font-semibold text-primary">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2 mb-4" />

      {/* Profile Sections */}
      <div className="space-y-3 mb-4">
        {profileSections.map((section, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  section.completed
                    ? "bg-green-100 text-green-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {section.completed ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <section.icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-xs lg:text-sm ${
                  section.completed
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {section.name}
              </span>
            </div>
            {section.completed ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-primary hover:bg-primary/10 h-7"
              >
                Add <Plus className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Action Link */}
      <Link href="/job-seeker/profile" className="block">
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
