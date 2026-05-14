import type { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { auth } from "./auth.config";
import { loginSchema, signupSchema } from "./auth.validators";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = signupSchema.parse(req.body);

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.fullName,
      },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Sign-up error:", error);
    throw error;
  }
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await auth.api.signInEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
      },
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    throw error;
  }
});


export const googleSignIn = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      res.redirect("/api/auth/login/social/google");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  },
);

export const appleSignIn = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.redirect("/api/auth/login/social/apple");
  } catch (error: any) {
    console.error("Apple sign-in error:", error);
    throw error;
  }
});
