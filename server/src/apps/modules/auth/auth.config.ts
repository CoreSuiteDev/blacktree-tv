import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, jwt } from "better-auth/plugins";
import prisma from "../../../infrastructure/database/connection";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET as string,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: "http://localhost:5000/api/auth",
  trustedOrigins: ["http://localhost:3000"],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    },
  },

  advanced: {
    cookiePrefix: "blacktree",
    useSecureCookies: false,
  },

  debug: true,

  plugins: [
    jwt({
      jwt: {
        expirationTime: "1h",
      },
    }),
    bearer(),
  ],
});

console.log("[Better Auth] Configured Base URL:", auth.options.baseURL);
