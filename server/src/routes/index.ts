import authRouter from "@/apps/modules/auth/auth.route";
import { Router } from "express";
import userRouter from "../apps/modules/user/user.route";
import dashboardRouter from "../apps/modules/dashboard/dashboard.route";

const router = Router();

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/dashboard", dashboardRouter);

export default router;
