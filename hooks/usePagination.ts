type PaginationItem =
  | { type: "page"; value: number }
  | { type: "dots"; id: string };

export function buildPagination(
  page: number,
  totalPages: number,
  siblingCount = 1,
): PaginationItem[] {
  if (totalPages <= 1) return [];

  const currentPage = Math.max(1, Math.min(page, totalPages));

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const items: PaginationItem[] = [];

  if (leftSibling < 2) {
    items.push({ type: "page", value: 1 });
    items.push({ type: "dots", id: "left-dots" });
  } else {
    for (let i = 1; i < leftSibling; i++) {
      items.push({ type: "page", value: i });
    }
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    items.push({ type: "page", value: i });
  }

  if (rightSibling < totalPages - 1) {
    items.push({ type: "dots", id: "right-dots" });
    items.push({ type: "page", value: totalPages });
  } else {
    for (let i = rightSibling + 1; i <= totalPages; i++) {
      items.push({ type: "page", value: i });
    }
  }

  return items;
}
