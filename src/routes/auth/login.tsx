import { useMutation, useQueryClient } from "@tanstack/solid-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/solid-router";
import { createSignal, type JSX } from "solid-js";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { authClient } from "@/lib/auth/client";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/utils";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

const inputSchema = z.object({
  email: z.email(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const login = useMutation(() => ({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data, error } = await authClient.signIn.email(credentials);

      if (error) throw error;
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: ({ user }) => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      queryClient.setQueryData(["auth", "user"], user);

      navigate({ to: "/my-page" });
    },
  }));

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();
    if (login.isPending) return;

    const input = inputSchema.safeParse({
      email: email(),
      password: password(),
    });

    if (!input.success) {
      console.error(input.error);
      return;
    }

    login.mutate({
      email: input.data.email,
      password: input.data.password,
    });
  };

  return (
    <main class="flex flex-col items-center px-12 pt-12 pb-16">
      <Card class="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            アカウントにログインするために、メールアドレスとパスワードを入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} class="grid gap-4">
            <TextField
              class="grid w-full items-center gap-1.5"
              value={email()}
              onChange={setEmail}
              name="email"
            >
              <TextFieldLabel for="email">Email</TextFieldLabel>
              <TextFieldInput
                type="email"
                id="email"
                placeholder="Email"
                autocomplete="email"
              />
            </TextField>

            <TextField
              class="grid w-full items-center gap-1.5"
              value={password()}
              onChange={setPassword}
              name="password"
            >
              <TextFieldLabel for="password">Password</TextFieldLabel>
              <TextFieldInput
                type="password"
                id="password"
                placeholder="Password"
                autocomplete="current-password"
              />
            </TextField>

            <Button
              type="submit"
              disabled={login.isPending}
              class="w-full mt-2"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p class="text-muted-foreground text-sm">
            アカウントをお持ちでない場合は
            <Link to="/auth/signup" class="underline hover:text-foreground">
              サインアップ
            </Link>
            してください。
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
