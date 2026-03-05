import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useGetJobSeekerProfile } from "@/hooks/useJobSeeker";
import { Bell, Search, Sparkles } from "lucide-react";
import Link from "next/link";

const JobSeekerNavbar = () => {
  const { data: jobSeekerProfile } = useGetJobSeekerProfile();
  return (
    <div className="px-4 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Welcome Text */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
            Welcome back,{" "}
            <span className="text-primary">
              {jobSeekerProfile?.full_name ?? "Jhon"}!
            </span>
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Here&apos;s what&apos;s happening with your job search today.
          </p>
        </div>

        {/* Quick Search & Notifications */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Link href="/job-seeker/jobs">
            <Card className="p-2 lg:p-3 bg-background border border-border hover:border-primary cursor-pointer transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </Card>
          </Link>

          {/* Notifications */}
          <Card className="p-2 lg:p-3 bg-background border border-border relative cursor-pointer hover:border-primary transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Card>

          {/* User Avatar */}
          <Link href={`/job-seeker/${jobSeekerProfile?.slug}`}>
            <Avatar className="h-10 w-10 lg:h-12 lg:w-12 border-2 border-primary cursor-pointer hover:scale-105 transition-transform">
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                JD
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      {/* Tips Card */}
      <Card className="mt-4 p-3 lg:p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 lg:w-5 h-4 lg:h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm lg:text-base font-semibold text-foreground mb-1">
              💡 Interview Tip of the Day
            </h3>
            <p className="text-xs lg:text-sm text-muted-foreground">
              Prepare for your upcoming interviews by researching company
              culture and practicing common questions.{" "}
              <Link
                href="/job-seeker/resources"
                className="text-primary hover:underline font-medium"
              >
                Learn more →
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobSeekerNavbar;
