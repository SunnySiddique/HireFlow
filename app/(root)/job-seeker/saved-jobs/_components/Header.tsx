import { cn } from "@/lib/utils";
import { InterviewFilters } from "@/types/interview";
import { SavedJob } from "@/types/jobs";

interface HeaderProps {
  jobs: SavedJob[];
  filters: InterviewFilters;
  updateFilter: (
    key: keyof InterviewFilters,
    value: string | number | boolean,
  ) => void;
}

const Header = ({
  jobs,

  filters,
  updateFilter,
}: HeaderProps) => {
  return (
    <>
      <div>
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
            Saved Jobs
          </h1>
          <p className="text-lg text-muted-foreground">
            You have {jobs.length} saved job{jobs.length !== 1 ? "s" : ""}{" "}
            waiting for you.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-2 bg-card p-1.5 rounded-xl border border-border/50 shadow-sm overflow-x-auto hide-scrollbar w-full md:w-auto">
            <button
              onClick={() => updateFilter("status", "all")}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap",
                filters.status === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              All Saved
            </button>
            <button
              onClick={() => updateFilter("status", "open")}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap",
                filters.status === "open"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              Actively Hiring
            </button>
            <button
              onClick={() => updateFilter("status", "closed")}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap",
                filters.status === "closed"
                  ? "bg-secondary text-secondary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              Closed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
