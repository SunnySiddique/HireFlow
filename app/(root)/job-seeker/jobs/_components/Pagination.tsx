import { Button } from "@/components/ui/button";
import { buildPagination } from "@/hooks/usePagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, onPageChange, totalPages }: PaginationProps) => {
  if (totalPages <= 1) return null;
  const safePage = Math.max(1, Math.min(page, totalPages));
  const items = buildPagination(safePage, totalPages);

  const handleChange = (newPage: number) => {
    if (newPage !== safePage) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 md:gap-3 mt-8 sm:mt-10 md:mt-12">
      {/* Page Info for Mobile */}
      <span className="sm:hidden text-xs text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      {/* Prev Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handleChange(page - 1)}
        className="flex items-center gap-1 px-2.5 sm:px-3 md:px-4 h-8 sm:h-9 text-xs sm:text-sm rounded-lg"
      >
        Prev
      </Button>

      {/* Pages - Hidden on very small screens */}
      <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
        {items.map((item) => {
          if (item.type === "dots") {
            return (
              <span
                key={item.id}
                className="px-1 sm:px-2 text-muted-foreground text-xs sm:text-sm"
              >
                ...
              </span>
            );
          }

          const isActive = item.value === safePage;

          return (
            <Button
              key={item.value}
              size="sm"
              variant={isActive ? "default" : "outline"}
              aria-current={isActive ? "page" : undefined}
              onClick={() => handleChange(item.value)}
              className="h-8 sm:h-9 w-8 sm:w-9 p-0 rounded-lg text-xs sm:text-sm"
            >
              {item.value}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={safePage === totalPages}
        onClick={() => handleChange(safePage + 1)}
        className="flex items-center gap-1 px-2.5 sm:px-3 md:px-4 h-8 sm:h-9 text-xs sm:text-sm rounded-lg"
      >
        Next
      </Button>

      {/* Page Info for Desktop */}
      <span className="hidden sm:inline text-xs sm:text-sm text-muted-foreground sm:ml-2 md:ml-4">
        Page {page} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
