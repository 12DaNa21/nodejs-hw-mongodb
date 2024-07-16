import { Router } from "express";
import validateBody from "../middlewares/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth-validation.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginUserController, logoutUserController, registerUserController, refreshUserSessionController } from "../controllers/auth-controller.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter ;
