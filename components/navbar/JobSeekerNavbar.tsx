import { Button } from "@/components/ui/button";
import { useGetJobSeekerProfile } from "@/hooks/useJobSeeker";
import { Bell, Menu } from "lucide-react";

interface JobSeekerNavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const JobSeekerNavbar = ({ setSidebarOpen }: JobSeekerNavbarProps) => {
  const { data: jobSeekerProfile } = useGetJobSeekerProfile();

  return (
    <>
      <nav className="bg-background border-b border-border sticky top-0 z-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 lg:px-8 py-4 lg:h-20 gap-4 lg:gap-0">
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <div>
              <h1 className="text-lg lg:text-2xl font-bold text-foreground">
                Good morning, {jobSeekerProfile?.full_name || "Job Seeker"} 👋
              </h1>
              <p className="text-xs lg:text-sm text-muted-foreground hidden lg:block">
                You have 3 new job matches and 1 interview scheduled today.
              </p>
            </div>
            <button
              className="lg:hidden text-foreground cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-2 lg:gap-4 w-full lg:w-auto">
            <Button
              variant="ghost"
              className="text-foreground text-sm lg:text-base flex-1 lg:flex-none"
            >
              <Bell className="w-4 lg:w-5 h-4 lg:h-5 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Notifications</span>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm lg:text-base flex-1 lg:flex-none">
              <span className="hidden sm:inline">Browse Jobs</span>
              <span className="sm:hidden">Browse</span>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default JobSeekerNavbar;
