import { Router } from "express";
import validateBody from "../middlewares/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth-validation.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginUserController, logoutUserController, registerUserController, refreshUserSessionController } from "../controllers/auth-controllers.js";

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
