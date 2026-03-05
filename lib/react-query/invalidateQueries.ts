import { QueryClient, QueryKey } from "@tanstack/react-query";

export const invalidateQuery = (queryClient: QueryClient, key: QueryKey) => {
  queryClient.invalidateQueries({ queryKey: key });
};
