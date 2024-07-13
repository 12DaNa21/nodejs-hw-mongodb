import { Router } from "express";
import validateBody from "../middlewares/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth-validation.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginUserController, logoutUserController, registerUserController, refreshUserSessionController } from "../controllers/auth-controller.js";
import { requestResetEmailController } from "../controllers/auth-controller.js";
import { requestResetEmailSchema } from "../validation/auth-validation.js";
import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post(
    '/request-reset-email',
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController),
  );
  authRouter.post(
    '/reset-password',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
  );

export default authRouter;
