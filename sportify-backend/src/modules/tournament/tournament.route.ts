import { Router } from "express";
import {
  getTournaments,
  getTournamentById,
  getTournamentStandings,
  createTournament,
} from "./tournament.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { createTournamentSchema } from "./tournament.validation";

const router = Router();

router.get("/", getTournaments);
router.get("/:id", getTournamentById);
router.get("/:id/standings", getTournamentStandings);
router.post("/", validateRequest(createTournamentSchema), createTournament);

export const tournamentRoutes = router;
