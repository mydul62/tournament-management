import { Router } from "express";
import { getNotifications } from "./notification.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, getNotifications);

export const notificationRoutes = router;
