import { TanStackDevtools } from "@tanstack/solid-devtools";
import { type QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtoolsPanel } from "@tanstack/solid-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/solid-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/solid-router-devtools";
import { type AuthQueryResult, authQueryOptions } from "@/lib/auth/queries";

import "@fontsource/inter";

import Header from "../components/Header";

import styleCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  user: AuthQueryResult;
}>()({
  beforeLoad: ({ context }) => {
    context.queryClient.prefetchQuery(authQueryOptions());
  },
  head: () => ({
    links: [{ rel: "stylesheet", href: styleCss }],
  }),
  shellComponent: RootComponent,
});

function RootComponent() {
  const context = Route.useRouteContext();

  return (
    <>
      <QueryClientProvider client={context().queryClient}>
        <HeadContent />

        <Header />

        <Outlet />
        <TanStackDevtools
          plugins={[
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: "Solid Query",
              render: <SolidQueryDevtoolsPanel />,
            },
          ]}
          config={{ defaultOpen: false }}
        />
      </QueryClientProvider>

      <Scripts />
    </>
  );
}
