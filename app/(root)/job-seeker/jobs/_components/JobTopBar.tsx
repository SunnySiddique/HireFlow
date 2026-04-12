import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { JobFiltersType } from "@/types/jobs";

interface JobTopBarProps {
  totalCount: number;
  sort?: JobFiltersType["sort"];
  onSortChange: (val: JobFiltersType["sort"]) => void;
  featuredCount: number;
  featured?: boolean;
  onFeaturedChange: (val: boolean) => void;
}

const JobTopBar = ({
  totalCount,
  sort,
  onSortChange,
  featuredCount,
  featured,
  onFeaturedChange,
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
      {featuredCount > 0 && (
        <button
          onClick={() => onFeaturedChange(!featured)}
          className={cn(
            "text-xs font-medium px-3 py-1 rounded-full border transition-all",
            featured
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-transparent text-primary border-primary/30 hover:border-primary/60",
          )}
        >
          {featured ? "⭐ Featured Only" : "⭐ Show Featured"}
        </button>
      )}

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
