import { Router } from "express";
import { getPlayers, createPlayer } from "./player.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { createPlayerSchema } from "./player.validation";

const router = Router();

router.get("/", getPlayers);
router.post("/", validateRequest(createPlayerSchema), createPlayer);

export const playerRoutes = router;
