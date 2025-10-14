import { queryOptions } from "@tanstack/solid-query";
import { getUser } from "./server-fn";

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: ({ signal }) => getUser({ signal }),
  });

export type AuthQueryResult = Awaited<ReturnType<typeof getUser>>;
