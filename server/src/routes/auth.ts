import { Router } from "express";
import { getCurrentUser, register, login } from "../controllers/auth.js";
import { loginLimiter, registerLimiter } from "../middleware/rateLimit.js";

const authRouter = Router();
authRouter.get("/me", getCurrentUser);
authRouter.post("/register", registerLimiter, register);
authRouter.post("/login", loginLimiter, login);

export { authRouter };
