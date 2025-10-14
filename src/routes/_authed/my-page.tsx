import { useMutation } from "@tanstack/solid-query";
import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth/client";

export const Route = createFileRoute("/_authed/my-page")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const context = Route.useRouteContext();
  const { name: username, emailVerified } = context().user;

  const logout = useMutation(() => ({
    mutationFn: async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate({ to: "/" });
          },
        },
      });
    },
  }));

  const handleLogout = () => {
    if (logout.isPending) return;

    logout.mutate();
  };

  return (
    <div class="p-12">
      <p>Hello {username}!</p>
      <p>Email verified: {emailVerified ? "Yes" : "No"}</p>

      <Button onClick={handleLogout} disabled={logout.isPending} class="mt-4">
        Logout
      </Button>
    </div>
  );
}
