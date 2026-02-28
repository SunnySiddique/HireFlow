import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  JOB_CATEGORY,
  SALARY_RANGES,
} from "@/constants/jobsData";
import { JobFiltersType } from "@/types/jobs";
import { ChevronDown } from "lucide-react";
import React from "react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  return (
    <div>
      <details open={defaultOpen} className="group">
        <summary className="flex items-center justify-between w-full cursor-pointer py-4 text-sm font-semibold text-foreground hover:text-primary transition-colors">
          {title}
          <ChevronDown
            size={16}
            className="transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="space-y-3 pb-4 border-b border-border last:border-b-0">
          {children}
        </div>
      </details>
      <Separator className="bg-border" />
    </div>
  );
}

interface FilterRadioProps {
  label: string;
  name: string;
  value: string;
}

function FilterRadio({ label, name, value }: FilterRadioProps) {
  return (
    <div className="flex items-center gap-3">
      <RadioGroupItem value={value} id={value} />
      <Label
        htmlFor={value}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
}

interface JobFiltersProps {
  filters: JobFiltersType;
  salaryLabel: string;
  onFilterChange: (updated: Partial<JobFiltersType>) => void;
  onSalaryChange: (label: string) => void;
  onClear: () => void;
}

const JobFilters = ({
  filters,
  salaryLabel,
  onFilterChange,
  onSalaryChange,
  onClear,
}: JobFiltersProps) => {
  return (
    <>
      <Card className="p-4 lg:p-6 w-full lg:w-72 h-fit">
        {/* Category */}
        <FilterSection title="Category">
          <RadioGroup
            value={filters.category ?? ""}
            onValueChange={(val) =>
              onFilterChange({ category: val === "all" ? undefined : val })
            }
          >
            {JOB_CATEGORY.map((item) => (
              <FilterRadio
                key={item.value}
                label={item.label}
                name="category"
                value={item.value}
              />
            ))}
          </RadioGroup>
        </FilterSection>

        <FilterSection title="Employment Type">
          <RadioGroup
            value={filters.employmentType ?? ""}
            onValueChange={(val) =>
              onFilterChange({
                employmentType: val === "all" ? undefined : val,
              })
            }
          >
            {EMPLOYMENT_TYPES.map((item) => (
              <FilterRadio
                name="employemnt"
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </RadioGroup>
        </FilterSection>

        {/* Experience Level */}
        <FilterSection title="Experience Level">
          <RadioGroup
            value={filters.experienceLevel ?? ""}
            onValueChange={(val) =>
              onFilterChange({
                experienceLevel: val === "all" ? undefined : val,
              })
            }
          >
            {EXPERIENCE_LEVELS.map((item) => (
              <FilterRadio
                name="experience"
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </RadioGroup>
        </FilterSection>

        {/* Salary Range */}
        <FilterSection title="Salary Range">
          <RadioGroup
            value={salaryLabel}
            onValueChange={(val) => onSalaryChange(val)}
          >
            {SALARY_RANGES.map((item) => (
              <FilterRadio
                name="salary"
                key={item.label}
                label={item.label}
                value={item.label}
              />
            ))}
          </RadioGroup>
        </FilterSection>

        <Button
          variant="ghost"
          className="w-full text-foreground border border-border hover:bg-muted"
          onClick={onClear}
        >
          Clear Filters
        </Button>
      </Card>
    </>
  );
};

export default JobFilters;
