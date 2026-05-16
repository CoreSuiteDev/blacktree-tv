import type { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  // Your signup logic
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
  // Your signin logic
});
