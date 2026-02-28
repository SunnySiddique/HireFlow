import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { JobFiltersType } from "@/types/jobs";
import { Grid3x3, List } from "lucide-react";

interface JobTopBarProps {
  totalCount: number;
  sort?: JobFiltersType["sort"];
  onSortChange: (val: JobFiltersType["sort"]) => void;
  setViewMode: (mode: "grid" | "list") => void;
}

const JobTopBar = ({
  totalCount,
  sort,
  onSortChange,
  setViewMode,
}: JobTopBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{totalCount}</span> jobs
      </p>

      <div className="flex items-center gap-3">
        <Select
          value={sort ?? "recent"}
          onValueChange={(val) => onSortChange(val as JobFiltersType["sort"])}
        >
          <SelectTrigger className="w-48 bg-background border border-border text-foreground">
            <SelectValue placeholder="Most Recent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="salary-high">Highest Salary</SelectItem>
            <SelectItem value="salary-low">Lowest Salary</SelectItem>
          </SelectContent>
        </Select>

        <ToggleGroup
          type="single"
          defaultValue="list"
          className="justify-start"
        >
          <ToggleGroupItem
            value="grid"
            aria-label="Grid view"
            title="Grid view"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 size={18} />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label="List view"
            title="List view"
            onClick={() => setViewMode("list")}
          >
            <List size={18} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default JobTopBar;
