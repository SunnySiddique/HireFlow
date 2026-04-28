import { InterviewFilters } from "@/types/interview";
import { useState } from "react";

export const useInterviewFilters = () => {
  const [filters, setFilters] = useState<InterviewFilters>({
    status: "all",
    page: 1,
    limit: 5,
    archived: false,
  });

  const updateFilter = (
    key: keyof InterviewFilters,
    value: string | number | boolean,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page:
        key === "status" || key === "archived" || key === "limit"
          ? 1
          : prev.page,
    }));
  };

  // reset all filters
  const resetFilters = () => {
    setFilters({
      status: "all",
      page: 1,
      limit: 5,
      archived: false,
    });
  };

  return {
    filters,
    updateFilter,
    resetFilters,
  };
};
