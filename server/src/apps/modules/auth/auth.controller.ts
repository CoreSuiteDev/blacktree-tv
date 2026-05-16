import type { Request, Response } from "express";
import { APIError } from "better-auth/api";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from "./auth.config";
import { asyncHandler } from "../../../utils/asyncHandler";

export const signIn = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password, rememberMe } = req.body;

      const result = await auth.api.signInEmail({
        body: {
          email,
          password,
          rememberMe: !!rememberMe,
        },

        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(Number(error.status) || 400).json({
          success: false,
          message: error.message,
          code: error.body?.code || "AUTH_ERROR",
        });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);


export const signUp = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const result = await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },

        headers: fromNodeHeaders(req.headers),
      });

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: result,
      });
    } catch (error) {
      if (error instanceof APIError) {
        return res.status(Number(error.status) || 400).json({
          success: false,
          message: error.message,
          code: error.body?.code || "AUTH_ERROR",
        });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);