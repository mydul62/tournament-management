import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { tournamentRoutes } from "../modules/tournament/tournament.route";
import { teamRoutes } from "../modules/team/team.route";
import { playerRoutes } from "../modules/player/player.route";
import { matchRoutes } from "../modules/match/match.route";
import { statsRoutes } from "../modules/stats/stats.route";
import { notificationRoutes } from "../modules/notification/notification.route";
import { auditRoutes } from "../modules/audit/audit.route";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/tournaments", route: tournamentRoutes },
  { path: "/teams", route: teamRoutes },
  { path: "/players", route: playerRoutes },
  { path: "/matches", route: matchRoutes },
  { path: "/stats", route: statsRoutes },
  { path: "/notifications", route: notificationRoutes },
  { path: "/audit", route: auditRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const applicationRoutes = router;
