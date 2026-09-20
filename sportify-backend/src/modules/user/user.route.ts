import { Router } from "express";
import { getUsers, getProfile } from "./user.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, getUsers);
router.get("/me", authenticate, getProfile);

export const userRoutes = router;
