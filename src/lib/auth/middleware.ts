import { createMiddleware } from "@tanstack/solid-start";
import { getRequest, setResponseStatus } from "@tanstack/solid-start/server";
import { auth } from "./auth";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: getRequest().headers,
    query: {
      disableCookieCache: true,
    },
  });

  if (!session) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }

  return next({ context: { user: session.user } });
});
