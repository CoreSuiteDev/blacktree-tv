import { Router } from "express";
import { protect, restrictTo } from "../../middleware/auth.middleware";


const router = Router();


router.use(protect);
router.use(restrictTo("ADMIN", "MODERATOR"));





export default router;
