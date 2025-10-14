import { drizzle } from "drizzle-orm/libsql";
import { serverEnv } from "../env/env";

export const db = drizzle(serverEnv.DB_FILE_NAME);
