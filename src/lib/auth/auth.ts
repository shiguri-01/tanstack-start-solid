import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { MIN_PASSWORD_LENGTH, sendEmail } from "./utils";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  // Tanstack Start + Solidの場合、
  // reactStart（＝Tanstack Start用？）を使うのかsolidStartを使うのかわからない
  plugins: [reactStartCookies()],

  // 認証方法
  emailAndPassword: {
    enabled: true,
    minPasswordLength: MIN_PASSWORD_LENGTH,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        data: {
          to: user.email,
          subject: "Verify your email address",
          body: `Click the link to verify your email: ${url}`,
        },
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
});

export type Session = typeof auth.$Infer.Session;
