import { QueryClient } from "@tanstack/solid-query";
import { createRouter } from "@tanstack/solid-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    context: { queryClient, user: null },
    routeTree,

    scrollRestoration: true,
  });

  return router;
};
