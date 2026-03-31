import { Input } from "@/components/ui/input";
import EmployerSearchFilter from "./EmployerSearchFilter";

const EmployerInterviewHeader = ({
  totalInterviews,
  filters,
  updateFilter,
  resetFilters,
}: {
  totalInterviews: number;
  filters: {
    search: string;
    status: string;
    type: string;
  };
  updateFilter: (key: string, value: string) => void;
  resetFilters: () => void;
}) => {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          My Interviews
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage and track all scheduled interviews
        </p>
      </div>
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <Input
              placeholder="Search by candidate name or interviewer..."
              className="h-10"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </div>
          <EmployerSearchFilter
            filters={filters}
            onFilterChange={updateFilter}
          />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {totalInterviews}
            </span>{" "}
            of {totalInterviews} interviews
          </p>
          <button
            onClick={resetFilters}
            className="text-primary hover:underline font-medium"
          >
            Clear filters
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployerInterviewHeader;
