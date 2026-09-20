import { Router } from "express";
import { loginUser, registerUser } from "./auth.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();

router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/register", validateRequest(registerSchema), registerUser);

export const authRoutes = router;
