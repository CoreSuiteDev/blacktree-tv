import { Router } from "express";
import { protect, restrictTo } from "../../middleware/auth.middleware";
import {
  deleteAccount,
  getAllUsers,
  getUserById,
} from "./user.controller";

const router = Router();

router.get("/all-user", protect, restrictTo("ADMIN", "MODERATOR"), getAllUsers);
router.get("/user/:id", protect, restrictTo("ADMIN", "MODERATOR", "USER"), getUserById);
router.delete("/user/:id", protect, restrictTo("ADMIN", "USER"), deleteAccount);

export default router;
