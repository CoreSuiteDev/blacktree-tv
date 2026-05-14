import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { jwt, bearer } from "better-auth/plugins";
import { importPKCS8, SignJWT } from "jose";
import prisma from "../../../infrastructure/database/connection";

const generateAppleClientSecret = async (
  clientId: string,
  keyId: string,
  teamId: string,
  privateKey: string,
) => {
  try {
    const key = await importPKCS8(privateKey, "ES256");
    const now = Math.floor(Date.now() / 1000);

    return new SignJWT({})
      .setProtectedHeader({ alg: "ES256", kid: keyId })
      .setIssuer(teamId)
      .setSubject(clientId)
      .setAudience("https://appleid.apple.com")
      .setIssuedAt(now)
      .setExpirationTime(now + 180 * 24 * 60 * 60)
      .sign(key);
  } catch (error: any) {}
};
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/api/auth",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Changed to false for easier testing as per common dev needs, can be toggled back
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: (await generateAppleClientSecret(
        process.env.APPLE_CLIENT_ID as string,
        process.env.APPLE_KEY_ID as string,
        process.env.APPLE_TEAM_ID as string,
        process.env.APPLE_PRIVATE_KEY as string,
      )) as string,
      appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER as string,
    },
  },
  trustedOrigins: ["https://appleid.apple.com"],
  plugins: [
    jwt({
      jwt: {
        expirationTime: "1h",
      },
    }),
    bearer(),
  ],
});
