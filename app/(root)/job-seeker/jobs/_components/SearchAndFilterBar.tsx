"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  JOB_CATEGORY,
  SALARY_RANGES,
} from "@/constants/jobsData";
import { useDebounce } from "@/hooks/useDebounce";
import { JobFiltersType } from "@/types/jobs";
import { MapPin, Search } from "lucide-react";
import { useEffect } from "react";

interface SearchAndFilterBarProps {
  filters: JobFiltersType;
  salaryLabel: string;
  onFilterChange: (updated: Partial<JobFiltersType>) => void;
  onSalaryChange: (label: string) => void;
  onClear: () => void;
}

const SearchAndFilterBar = ({
  filters,
  salaryLabel,
  onFilterChange,
  onSalaryChange,
  onClear,
}: SearchAndFilterBarProps) => {
  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedLocation = useDebounce(filters.location, 500);

  useEffect(() => {
    onFilterChange({
      search: debouncedSearch?.trim() ?? "",
      location: debouncedLocation?.trim() ?? "",
    });
  }, [debouncedSearch, debouncedLocation]);

  return (
    <Card className="p-4 lg:p-6 bg-background border border-border">
      <div className="space-y-4">
        {/* Top Inputs: Search & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Job title, keyword or company..."
              className="pl-10 pr-4 py-2 bg-background border border-border text-foreground w-full"
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
          </div>

          <div className="relative w-full">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="City, state or remote..."
              className="pl-10 pr-4 py-2 bg-background border border-border text-foreground w-full"
              value={filters.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
            />
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
          <Select
            value={filters.category}
            onValueChange={(val) => onFilterChange({ category: val })}
          >
            <SelectTrigger className="w-full bg-background border border-border text-foreground">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {JOB_CATEGORY.map((item) => (
                <SelectItem value={item.value} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.employmentType}
            onValueChange={(val) => onFilterChange({ employmentType: val })}
          >
            <SelectTrigger className="w-full bg-background border border-border text-foreground">
              <SelectValue placeholder="Employment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {EMPLOYMENT_TYPES.map((item) => (
                <SelectItem value={item.value} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.experienceLevel}
            onValueChange={(val) => onFilterChange({ experienceLevel: val })}
          >
            <SelectTrigger className="w-full bg-background border border-border text-foreground">
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {EXPERIENCE_LEVELS.map((level) => (
                <SelectItem value={level.value} key={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={salaryLabel}
            onValueChange={(val) => onSalaryChange(val)}
          >
            <SelectTrigger className="w-full bg-background border border-border text-foreground">
              <SelectValue placeholder="Salary Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {SALARY_RANGES.map((item) => (
                <SelectItem value={item.label} key={item.label}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            className="w-full sm:col-span-2 text-foreground border border-border hover:bg-muted"
            onClick={onClear}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchAndFilterBar;
