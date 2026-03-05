import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";

interface JobHeaderProps {
  jobSeekerProfile?: { full_name?: string };
  setSidebarOpen: (open: boolean) => void;
}

const JobHeader = ({ jobSeekerProfile, setSidebarOpen }: JobHeaderProps) => {
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 lg:px-8 py-4 lg:h-20 gap-4 lg:gap-0">
        {/* Left Section */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
              Good morning, {jobSeekerProfile?.full_name || "Job Seeker"} 👋
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground hidden lg:block">
              You have 3 new job matches and 1 interview scheduled today.
            </p>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground cursor-pointer p-2 rounded hover:bg-muted"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 lg:gap-4 w-full lg:w-auto flex-wrap">
          {/* Notifications */}
          <Button
            variant="ghost"
            className="flex items-center justify-center text-foreground text-sm sm:text-base flex-1 sm:flex-none gap-1 sm:gap-2 min-w-[120px]"
          >
            <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="hidden sm:inline">Notifications</span>
          </Button>

          {/* Browse Jobs */}
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base flex-1 sm:flex-none min-w-[120px]">
            <span className="hidden sm:inline">Browse Jobs</span>
            <span className="sm:hidden">Browse</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default JobHeader;
