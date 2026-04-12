import { InterviewFilters } from "@/types/interview";
import { useState } from "react";

export const useInterviewFilters = () => {
  const [filters, setFilters] = useState<InterviewFilters>({
    status: "all",
    page: 1,
    limit: 5,
  });

  const updateFilter = (
    key: keyof InterviewFilters,
    value: string | number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "status" ? 1 : prev.page,
    }));
  };

  // reset all filters
  const resetFilters = () => {
    setFilters({
      status: "all",
      page: 1,
      limit: 5,
    });
  };

  return {
    filters,
    updateFilter,
    resetFilters,
  };
};
