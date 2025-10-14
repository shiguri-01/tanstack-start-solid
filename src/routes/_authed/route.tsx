import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { authQueryOptions } from "@/lib/auth/queries";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions(),
      revalidateIfStale: true,
    });

    if (!user) {
      throw redirect({ to: "/auth/login" });
    }
    // userをコンテキストに再度追加
    // これによりUser | nullではなくUserとして型推論される
    return { user };
  },
  component: Outlet,
});
