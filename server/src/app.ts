import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

import { toNodeHandler } from "better-auth/node";
import { errorMiddleware } from "./apps/middleware/error.middleware";
import { authConfig } from "./apps/modules/auth/auth.config";
import config from "./config";
import routes from "./routes";
import { AppError } from "./utils/AppError";

const app = express();

app.set("trust proxy", true);

// 1. Security & Optimization Middleware
app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
    methods: [...config.cors.methods],
  }),
);

// Rate Limiting
const limiter = rateLimit({
  max: config.rateLimit.maxRequests,
  windowMs: config.rateLimit.windowMs,
  message: "Too many requests from this IP, please try again later!",
});
app.use("/api", limiter);

// Logging
app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));

// 2. Parsing Middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// 3. Routes
app.get("/health", (_: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// API Routes
app.use("/api/v1", routes);

// Auth Middleware
app.all("/api/auth/{*any}", toNodeHandler(authConfig));

// 4. Error Handling
app.all("*path", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      `Cannot find ${req.method} ${req.originalUrl} on this server!`,
      404,
    ),
  );
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
