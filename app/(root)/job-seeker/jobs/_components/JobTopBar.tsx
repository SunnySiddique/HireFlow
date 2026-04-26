import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobFiltersType } from "@/types/jobs";
import { Star } from "lucide-react";

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
      {/* {featuredCount > 0 && (
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
      )} */}

      <div className="flex items-center rounded-lg border border-border bg-muted p-1 shrink-0">
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
        <button
          onClick={() => onFeaturedChange(!featured)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
            featured
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Star
            className={`h-3 w-3 ${featured ? "fill-primary-foreground" : ""}`}
          />
          Featured
        </button>
      </div>
    </div>
  );
};

export default JobTopBar;
