import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../apps/modules/auth/auth.config";
import { protect } from "../apps/middleware/auth.middleware";
import * as authController from "../apps/modules/auth/auth.controller";

const authRouter = Router();

// Custom Signup/Login Routes (mapping fullName to name)
authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.signIn);

// Social Login Trigger Routes
authRouter.get("/google", authController.googleSignIn);
authRouter.get("/apple", authController.appleSignIn);

// Get current user (protected)
authRouter.get("/me", protect, (req, res) => {
  console.log("Protect middleware passed. User ID:", req.user?.id);
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
    console.error("Error in /me route serialization:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mount better-auth for all other requests (callback, sessions, etc.)
authRouter.all("*path", toNodeHandler(auth));

export default authRouter;
