export function applyPagination(page = 1, limit = 10) {
  const safePage = Math.max(page, 1);

  return {
    from: (safePage - 1) * limit,
    to: safePage * limit - 1,
    page: safePage,
    limit,
  };
}
