import { Router } from "express";
import { getAuditLogs } from "./audit.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeRoles } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", authenticate, authorizeRoles("ADMIN"), getAuditLogs);

export const auditRoutes = router;
