import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, bearer, emailOTP, jwt } from "better-auth/plugins";
import prisma from "../../../infrastructure/database/connection";
import { sendOTPEmail } from "./auth.service";

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
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        await sendOTPEmail(email, otp, type);
      },
    }),
    jwt({
      jwt: {
        expirationTime: "1h",
      },
    }),
    bearer(),
  ],
});

console.log("[Better Auth] Configured Base URL:", auth.options.baseURL);
