import prisma from "@/infrastructure/database/connection";
import { asyncHandler } from "@/utils/asyncHandler";
import { APIError } from "better-auth";
import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response } from "express";
import { auth } from "../auth/auth.config";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        sessions: {
          select: {
            id: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        profile: true,
        emailVerified: true,
        image: true,
        accounts: {
          select: {
            id: true,
            providerId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
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

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if ((req.user as any)?.role !== "ADMIN" && (req.user as any)?.role !== "MODERATOR" && (req.user as any)?.id !== id) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view this profile",
      });
    }

    const result = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        sessions: {
          select: {
            id: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        profile: true,
        emailVerified: true,
        image: true,
        accounts: {
          select: {
            id: true,
            providerId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
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

export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if ((req.user as any)?.role !== "ADMIN" && (req.user as any)?.id !== id) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to delete this account",
        });
      }

      const result = await prisma.user.delete({
        where: {
          id: id as string,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Account deleted successfully",
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