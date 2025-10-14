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
import authClient from "@/lib/auth/client";
import { authQueryOptions } from "@/lib/auth/queries";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/utils";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

const inputSchema = z.object({
  email: z.email(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signup = useMutation(() => ({
    mutationFn: async (data: {
      email: string;
      password: string;
      name: string;
    }) => {
      await authClient.signUp.email(
        {
          ...data,
        },
        {
          onError: ({ error }) => {
            console.error(error);
          },
          onSuccess: () => {
            queryClient.removeQueries({
              queryKey: authQueryOptions().queryKey,
            });
            navigate({ to: "/my-page" });
          },
        },
      );
    },
  }));

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
    e.preventDefault();
    if (signup.isPending) return;

    const input = inputSchema.safeParse({
      email: email(),
      password: password(),
    });

    if (!input.success) {
      console.error(input.error);
      return;
    }

    signup.mutate({
      email: input.data.email,
      password: input.data.password,
      name: input.data.email,
    });
  };

  return (
    <main class="flex flex-col items-center px-12 pt-12 pb-16">
      <Card class="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            アカウントを作成するために、メールアドレスとパスワードを入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} class="grid gap-4">
            <TextField
              class="grid w-full items-center gap-1.5"
              value={email()}
              onChange={setEmail}
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
            >
              <TextFieldLabel for="password">Password</TextFieldLabel>
              <TextFieldInput
                type="password"
                id="password"
                placeholder="Password"
                autocomplete="new-password"
              />
            </TextField>

            <Button
              type="submit"
              disabled={signup.isPending}
              class="w-full mt-2"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p class="text-muted-foreground text-sm">
            すでにアカウントをお持ちなら
            <Link to="/auth/login" class="underline hover:text-foreground">
              ログイン
            </Link>
            してください。
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
