import { Router } from "express";
import { ExpressAuth } from "@auth/express";
import Google from "@auth/express/providers/google";
import Apple from "@auth/express/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../infrastructure/database/connection";

const authRouter = Router();

authRouter.use("/*", ExpressAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Apple
  ],
}));

export default authRouter;
