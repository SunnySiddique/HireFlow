import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import Link from "next/link";

const EmptyState = ({ msg }: { msg: string }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No {msg} Applications
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          You haven&apos;t applied to any jobs yet. Start exploring
          opportunities and submit your first application!
        </p>
        <Link href="/job-seeker/jobs">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Browse Jobs
          </Button>
        </Link>
      </div>
    </>
  );
};

export default EmptyState;
