import * as z from "zod";

const serverEnvSchema = z.object({
  DB_FILE_NAME: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
