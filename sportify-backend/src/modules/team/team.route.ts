import { Router } from "express";
import { getTeams, getTeamById, createTeam } from "./team.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { createTeamSchema } from "./team.validation";

const router = Router();

router.get("/", getTeams);
router.get("/:id", getTeamById);
router.post("/", validateRequest(createTeamSchema), createTeam);

export const teamRoutes = router;
