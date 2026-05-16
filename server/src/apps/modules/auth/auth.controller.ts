import { APIError } from "better-auth/api";
import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response } from "express";

import { asyncHandler } from "../../../utils/asyncHandler";
import { auth } from "./auth.config";

export const signIn = asyncHandler(async (req: Request, res: Response) => {
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
});

export const signUp = asyncHandler(async (req: Request, res: Response) => {
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
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await auth.api.signOut({
      headers: fromNodeHeaders(req.headers),
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
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
});

export const getSession = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    return res.status(200).json({
      success: true,
      message: "Session retrieved successfully",
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
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const result = await auth.api.sendVerificationOTP({
        body: {
          email,
          type: "forget-password",
        },

        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "Verification OTP sent to your email",
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
  }
);

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;

      const result = await auth.api.resetPassword({
        body: {
          token,
          newPassword: password,
        },

        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "Reset password successful",
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
  }
);

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body;

      const result = await auth.api.changePassword({
        body: {
          currentPassword: oldPassword,
          newPassword,
        },

        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "Change password successful",
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
  }
);

export const verifyOtpCode = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, code, type } = req.body;

      const result = await auth.api.verifyEmailOTP({
        body: {
          email,
          otp: code,
        },

        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "OTP code verified successfully",
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
  }
);

export const resendOtpCode = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, type } = req.body;

      const result = await auth.api.sendVerificationOTP({
        body: {
          email,
          type,
        },
        headers: fromNodeHeaders(req.headers),
      });

      return res.status(200).json({
        success: true,
        message: "OTP code resent successfully",
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
  }
);

