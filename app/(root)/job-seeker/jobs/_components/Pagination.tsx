import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, onPageChange, totalPages }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const siblingCount = 1;
  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);

  const pages: (number | string)[] = [];

  if (leftSibling > 2) {
    pages.push(1);
    pages.push("...");
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  if (rightSibling < totalPages - 1) {
    pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6">
      {/* Page Info for Mobile */}
      <span className="sm:hidden text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      {/* Prev Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-1 px-3 h-9"
      >
        Prev
      </Button>

      {/* Pages - Hidden on very small screens */}
      <div className="hidden sm:flex items-center gap-1">
        {pages.map((p, index) =>
          typeof p === "string" ? (
            <span key={index} className="px-2 text-muted-foreground">
              {p}
            </span>
          ) : (
            <Button
              key={p}
              size="sm"
              variant={p === page ? "default" : "outline"}
              onClick={() => onPageChange(p)}
              className="h-9 w-9 p-0 rounded-lg"
            >
              {p}
            </Button>
          ),
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-1 px-3 h-9"
      >
        Next
      </Button>

      {/* Page Info for Desktop */}
      <span className="hidden sm:inline text-sm text-muted-foreground ml-4">
        Page {page} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
