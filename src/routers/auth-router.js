import { Router } from "express";
import validateBody from "../middlewares/validateBody.js";


import { loginUserSchema, registerUserSchema, requestResetEmailSchema } from "../validation/auth-validation.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginUserController, logoutUserController, registerUserController, refreshUserSessionController, requestResetEmailController } from "../controllers/auth-controller.js";


const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));



;

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post('/request-reset-email', validateBody(requestResetEmailSchema), (req, res, next) => {
  console.log('Request reset email route hit');
  next();
}, ctrlWrapper(requestResetEmailController));

export default authRouter 
