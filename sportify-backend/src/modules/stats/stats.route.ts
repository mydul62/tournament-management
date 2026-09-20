import { Router } from "express";
import { getTopScorers, getTopAssists } from "./stats.controller";

const router = Router();

router.get("/top-scorers", getTopScorers);
router.get("/top-assists", getTopAssists);

export const statsRoutes = router;
