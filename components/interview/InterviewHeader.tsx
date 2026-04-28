import { cn } from "@/lib/utils";
import { InterviewFilters } from "@/types/interview";

interface InterviewHeaderProps {
  updateFilter: (key: keyof InterviewFilters, value: string | number) => void;
  resetFilters: () => void;
  filters: InterviewFilters;
  role: "seeker" | "employer";
}

const InterviewHeader = ({
  updateFilter,
  resetFilters,
  filters,
  role,
}: InterviewHeaderProps) => {
  console.log(filters);
  const handleReset = () => {
    resetFilters();
  };
  return (
    <>
      <div className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-10 md:mb-12 lg:mb-14">
        <div>
          <h1 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-2 sm:mb-3 md:mb-4 leading-tight">
            {role === "seeker" ? "My Interviews" : "Candidate Interviews"}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {role === "seeker"
              ? "Manage your upcoming interviews and review past ones."
              : "Manage your upcoming interviews and review past ones with candidates."}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap md:flex-row items-center gap-1.5 sm:gap-2 bg-card/60 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl border border-border/40 shadow-sm overflow-x-auto hide-scrollbar">
          {["all", "upcoming", "completed", "canceled"].map((f: string) => (
            <button
              key={f}
              onClick={() => {
                updateFilter("status", f);
              }}
              className={cn(
                "px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold capitalize transition-all whitespace-nowrap duration-200",
                filters.status === f
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto h-6 w-px bg-border/30 hidden xs:block" />
          <button
            onClick={handleReset}
            className="px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold capitalize transition-all whitespace-nowrap text-muted-foreground hover:bg-muted/60 hover:text-foreground ml-1"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default InterviewHeader;
