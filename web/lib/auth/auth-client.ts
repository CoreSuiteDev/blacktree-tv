import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Must match the baseURL in your backend auth.config.ts exactly
  baseURL: "http://localhost:5000/api/auth",
});