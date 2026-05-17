import express, { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import * as authController from "./auth.controller";

const authRouter = Router();

// 1. Custom Signup/Login Routes
authRouter.post("/sign-up", express.json(), authController.signUp);
authRouter.post("/sign-in", express.json(), authController.signIn);
authRouter.post("/logout", protect, authController.logout);
authRouter.post("/get-session", protect, authController.getSession);
authRouter.post("/forgot-password", express.json(), authController.forgotPassword);
authRouter.post("/reset-password", express.json(), authController.resetPassword);
authRouter.post("/change-password", protect, express.json(), authController.changePassword);
authRouter.post("/verify-otp", express.json(), authController.verifyOtpCode);
authRouter.post("/resend-otp", protect, authController.resendOtpCode);

// 3. Get current user (protected)
authRouter.get("/me", protect, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Session is valid",
      user: {
        id: req.user?.id,
        email: req.user?.email,
        name: req.user?.name,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default authRouter;
