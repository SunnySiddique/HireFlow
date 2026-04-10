import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobFiltersType } from "@/types/jobs";

interface JobTopBarProps {
  totalCount: number;
  sort?: JobFiltersType["sort"];
  onSortChange: (val: JobFiltersType["sort"]) => void;
  featuredCount: number;
}

const JobTopBar = ({
  totalCount,
  sort,
  onSortChange,
  featuredCount,
}: JobTopBarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        Showing{" "}
        <span className="font-medium text-foreground">{totalCount}</span> jobs
        {featuredCount > 0 && (
          <span className="ml-1 text-primary font-medium">
            ({featuredCount} featured)
          </span>
        )}
      </p>

      <div className="w-full sm:w-auto">
        <Select
          value={sort ?? "all"}
          onValueChange={(val) => onSortChange(val as JobFiltersType["sort"])}
        >
          <SelectTrigger className="w-full sm:w-[180px] md:w-[200px] bg-background border border-border text-xs sm:text-sm">
            <SelectValue placeholder="Sort jobs" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="salary-high">Highest Salary</SelectItem>
            <SelectItem value="salary-low">Lowest Salary</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobTopBar;
