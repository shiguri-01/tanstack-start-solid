import { useMutation, useQueryClient } from "@tanstack/solid-query";
import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

export const Route = createFileRoute("/_authed/my-page")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const context = Route.useRouteContext();
  const { name: username, emailVerified } = context().user;

  const logout = useMutation(() => ({
    mutationFn: async () => {
      const { data, error } = await authClient.signOut({
        fetchOptions: {
          onError(context) {
            console.error(context.error);
          },
        },
      });

      if (error) throw error;
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: ["auth"],
      });
      queryClient.clear();

      navigate({ to: "/" });
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
