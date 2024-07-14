import { Router } from 'express';
import contactsRouter from './contacts-router.js';
import authRouter from './auth-router.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', (req, res, next) => {
  console.log('Auth route hit');
  next();
}, authRouter);

export default router;
