import { Button } from "@/components/ui/button";
import { Bell, PlusCircle } from "lucide-react";

const EmployerNavbar = () => {
  return (
    <>
      <nav className="bg-background border-b border-border h-20 flex items-center justify-between px-8 sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Good morning, TechNova 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Here's what's happening with your job listings today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-foreground">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="w-4 h-4 mr-2" />
            Post a Job
          </Button>
        </div>
      </nav>
    </>
  );
};

export default EmployerNavbar;
