/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DB_FILE_NAME: string;
      readonly BETTER_AUTH_SECRET: string;
      readonly BETTER_AUTH_URL: string;
    }
  }
}

export {};
