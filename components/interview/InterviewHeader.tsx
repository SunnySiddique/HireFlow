import { cn } from "@/lib/utils";
import { filtersType, InterviewFilters } from "@/types/interview";

interface InterviewHeaderProps {
  updateFilter: (key: keyof InterviewFilters, value: string | number) => void;
  resetFilters: () => void;
  filter: "all" | "upcoming" | "completed" | "canceled";
  setFilter: (f: "all" | "upcoming" | "completed" | "canceled") => void;
  role: "seeker" | "employer";
}

const InterviewHeader = ({
  updateFilter,
  resetFilters,
  filter,
  setFilter,
  role,
}: InterviewHeaderProps) => {
  const handleReset = () => {
    resetFilters();
    setFilter("all");
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
            {role === "seeker" ? "My Interviews" : " Candidate Interviews"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {role === "seeker"
              ? "Manage your upcoming interviews and review past ones."
              : "Manage your upcoming interviews and review past ones with candidates."}
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 bg-card p-1.5 rounded-xl border border-border/50 shadow-sm overflow-x-auto hide-scrollbar">
          {["all", "upcoming", "completed", "canceled"].map((f: string) => (
            <button
              key={f}
              onClick={() => {
                updateFilter("status", f);
                setFilter(f as filtersType);
              }}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all whitespace-nowrap",
                filter === f
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all whitespace-nowrap text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default InterviewHeader;
