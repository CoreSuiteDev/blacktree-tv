import { Router } from "express";
import { deleteAccount, getAllUsers, getUserById } from "./user.controller";

const router = Router();

router.get("/all-user", getAllUsers);
router.get("/user/:id", getUserById);
router.delete("/user/:id", deleteAccount);

export default router;
