import { Router } from "express";
import contactRouter from './contacts-router.js';
import authRouter from './auth-router.js';

const router = Router();

router.use('/contacts', contactRouter);
router.use('/auth', authRouter);

export default router;
