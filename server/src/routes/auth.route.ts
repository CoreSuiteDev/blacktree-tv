import { ExpressAuth } from "@auth/express";
import { Router } from "express";
import { authConfig } from "../apps/modules/auth/auth.config";

const router = Router();

router.use("/*", ExpressAuth(authConfig));

export default router;
