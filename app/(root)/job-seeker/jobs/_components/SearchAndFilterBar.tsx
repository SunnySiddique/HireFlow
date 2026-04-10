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
    <Card className="p-4 md:p-5 lg:p-6 bg-background border border-border">
      <div className="space-y-4">
        {/* 🔍 Search Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Job title, keyword or company..."
              className="pl-10 w-full text-sm placeholder:text-sm"
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
          </div>

          {/* Location */}
          <div className="relative w-full">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="City, state or remote..."
              className="pl-10 w-full text-sm placeholder:text-sm"
              value={filters.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
            />
          </div>
        </div>

        {/* 🎯 Filters (2 columns on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Category */}
          <Select
            value={filters.category}
            onValueChange={(val) => onFilterChange({ category: val })}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {JOB_CATEGORY.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Employment Type */}
          <Select
            value={filters.employmentType}
            onValueChange={(val) => onFilterChange({ employmentType: val })}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {EMPLOYMENT_TYPES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Experience */}
          <Select
            value={filters.experienceLevel}
            onValueChange={(val) => onFilterChange({ experienceLevel: val })}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {EXPERIENCE_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Salary */}
          <Select
            value={salaryLabel}
            onValueChange={(val) => onSalaryChange(val)}
          >
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Salary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {SALARY_RANGES.map((item) => (
                <SelectItem key={item.label} value={item.label}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            onClick={onClear}
            className="text-sm border border-border"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchAndFilterBar;
