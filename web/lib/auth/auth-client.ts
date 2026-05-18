import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Dynamically resolve base URL to avoid CSP origin conflicts and port blocking
  baseURL: typeof window !== "undefined" 
    ? window.location.origin + "/api/auth" 
    : (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:5000/api/auth"),
});