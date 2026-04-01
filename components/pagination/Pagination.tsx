"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onNext?: () => void;
  onPrev?: () => void;
}

const Pagination = ({
  currentPage = 1,
  totalPages = 5,
  onNext,
  onPrev,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-end gap-6 py-4 pr-4">
      {/* Previous Button */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={18} />
        <span className="text-sm font-medium">Prev</span>
      </button>

      {/* Page Info */}
      <div className="text-center">
        <p className="text-sm font-semibold text-[var(--foreground)]">
          Page <span className="text-[var(--primary)]">{currentPage}</span> of{" "}
          <span className="text-[var(--primary)]">{totalPages}</span>
        </p>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="text-sm font-medium">Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
