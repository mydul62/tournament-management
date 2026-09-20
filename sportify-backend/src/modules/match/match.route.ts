import { Router } from "express";
import { getMatches, getLiveMatches, getMatchById, updateMatchScore } from "./match.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { updateScoreSchema } from "./match.validation";

const router = Router();

router.get("/", getMatches);
router.get("/live", getLiveMatches);
router.get("/:id", getMatchById);
router.patch("/:id/score", validateRequest(updateScoreSchema), updateMatchScore);

export const matchRoutes = router;
