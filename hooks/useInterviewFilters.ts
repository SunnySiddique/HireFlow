import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

type InterviewFilters = {
  search: string;
  status: string;
  type: string;
};

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
