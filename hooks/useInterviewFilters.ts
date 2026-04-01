import { useDebounce } from "@/hooks/useDebounce";
import { InterviewFilters } from "@/types/interview";
import { useState } from "react";

export const useInterviewFilters = () => {
  const [filters, setFilters] = useState<InterviewFilters>({
    search: "",
    status: "all",
    page: 1,
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const queryFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const updateFilter = (
    key: keyof InterviewFilters,
    value: string | number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "search" || key === "status" ? 1 : prev.page,
    }));
  };

  // reset all filters
  const resetFilters = () => {
    setFilters({
      search: "",
      status: "all",
      type: "all",
    });
  };

  return {
    filters,
    queryFilters,
    updateFilter,
    resetFilters,
  };
};
