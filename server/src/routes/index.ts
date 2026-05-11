import { Router } from 'express';
import userRouter from '../apps/modules/user/user.route';

const router = Router();

router.use('/users', userRouter);

export default router;
