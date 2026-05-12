import Google from "@auth/express/providers/google";
import Apple from "@auth/express/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../infrastructure/database/connection";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Apple
  ],
};
