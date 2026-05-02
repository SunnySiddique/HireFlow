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

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const items: PaginationItem[] = [];

  items.push({ type: "page", value: 1 });

  if (showLeftDots) {
    items.push({ type: "dots", id: "left-dots" });
  } else {
    for (let i = 2; i < leftSibling; i++) {
      items.push({ type: "page", value: i });
    }
  }

  for (
    let i = Math.max(leftSibling, 2);
    i <= Math.min(rightSibling, totalPages - 1);
    i++
  ) {
    items.push({ type: "page", value: i });
  }

  if (showRightDots) {
    items.push({ type: "dots", id: "right-dots" });
  } else {
    for (let i = rightSibling + 1; i < totalPages; i++) {
      items.push({ type: "page", value: i });
    }
  }

  items.push({ type: "page", value: totalPages });

  return items;
}
