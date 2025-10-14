import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { authQueryOptions } from "@/lib/auth/queries";

export const Route = createFileRoute("/auth")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    });
    if (user) {
      throw redirect({ to: "/my-page" });
    }
  },
  component: Outlet,
});
