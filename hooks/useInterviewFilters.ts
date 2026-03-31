import { useDebounce } from "@/hooks/useDebounce";
import { InterviewFilters } from "@/types/interview";
import { useState } from "react";

export const useInterviewFilters = () => {
  const [filters, setFilters] = useState<InterviewFilters>({
    search: "",
    status: "all",
    type: "all",
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const queryFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const updateFilter = (key: keyof InterviewFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
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
