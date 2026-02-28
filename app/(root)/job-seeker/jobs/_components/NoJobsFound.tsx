import { Button } from "@/components/ui/button";
import { Briefcase, RefreshCcw, Search } from "lucide-react";

const NoJobsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <Briefcase
            size={40}
            className="text-muted-foreground"
            strokeWidth={1.5}
          />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
          <Search
            size={14}
            className="text-muted-foreground"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Jobs Found
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-8">
        We couldn't find any jobs matching your search or filters. Try adjusting
        your filters or search with different keywords.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="gap-2 border-border text-foreground"
        >
          <RefreshCcw size={15} strokeWidth={1.5} />
          Reset Filters
        </Button>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Search size={15} strokeWidth={1.5} />
          Browse All Jobs
        </Button>
      </div>
    </div>
  );
};

export default NoJobsFound;
