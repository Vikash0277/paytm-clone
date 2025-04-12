import express from 'express';
import {router as userRouter} from './user.js';
import {router as AccountRouter} from './account.js';
const router = express.Router();


router.use('/user', userRouter);
router.use('/Account', AccountRouter);

export default router;