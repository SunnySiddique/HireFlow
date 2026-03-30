import { Input } from "@/components/ui/input";
import EmployerSearchFilter from "./EmployerSearchFilter";

const EmployerInterviewHeader = ({
  totalInterviews,
}: {
  totalInterviews: number;
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
            />
          </div>
          <EmployerSearchFilter
          // onStatusChange={"all"}
          // onTypeChange={""}
          // statusFilter=""
          // typeFilter=""
          />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {/* {filteredInterviews.length} */} 20
            </span>{" "}
            of {totalInterviews} interviews
          </p>
          {/* {(searchQuery ||
                  statusFilter !== "All" ||
                  typeFilter !== "All") && ( */}
          <button
            // onClick={() => {
            //   setSearchQuery("");
            //   setStatusFilter("All");
            //   setTypeFilter("All");
            // }}
            className="text-primary hover:underline font-medium"
          >
            Clear filters
          </button>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default EmployerInterviewHeader;
