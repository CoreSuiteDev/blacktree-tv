import authRouter from "@/apps/modules/auth/auth.route";
import { Router } from "express";
import userRouter from "../apps/modules/user/user.route";

const router = Router();

router.use("/auth", authRouter);

router.use("/users", userRouter);

export default router;
