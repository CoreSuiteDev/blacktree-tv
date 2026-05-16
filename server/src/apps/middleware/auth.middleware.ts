import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../modules/auth/auth.config";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";

/**
 * Middleware to protect routes and ensure the user is authenticated.
 * It validates the session/tokens provided in headers or cookies.
 */
export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Validate session via better-auth
  console.log("Validating session...");
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    console.warn("No session found in protect middleware");
    return next(new AppError("You are not logged in! Please log in to get access.", 401));
  }

  console.log("Session found for user:", session.user.id);

  // Add user and session info to the request object for use in controllers
  req.user = session.user as any;
  req.session = session.session as any;

  next();
});

/**
 * Middleware to restrict access to specific roles.
 * Must be used after the 'protect' middleware.
 */
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Note: Better-auth stores role in the user object if configured
    const userRole = (req.user as any)?.role;
    
    if (!userRole || !roles.includes(userRole)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }

    next();
  };
};
