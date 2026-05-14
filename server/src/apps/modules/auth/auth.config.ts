import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { importPKCS8, SignJWT } from "jose";

const prisma = new PrismaClient();

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
export const authConfig = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    apple: {
      prompt: "select_account",
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: await generateAppleClientSecret(
        process.env.APPLE_CLIENT_ID as string,
        process.env.APPLE_KEY_ID as string,
        process.env.APPLE_TEAM_ID as string,
        process.env.APPLE_PRIVATE_KEY as string,
      ),

      appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER as string,
    },
  },
  trustedOrigins: ["https://appleid.apple.com"],
});
