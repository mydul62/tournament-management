import { z } from "zod";

export const updateScoreSchema = z.object({
  body: z.object({
    homeScore: z.number().min(0),
    awayScore: z.number().min(0),
    minute: z.number().optional(),
  }),
});

export const addEventSchema = z.object({
  body: z.object({
    type: z.enum(["GOAL", "YELLOW_CARD", "RED_CARD", "SUB", "PENALTY"]),
    minute: z.number().min(1).max(120),
    playerName: z.string().optional(),
    detail: z.string().optional(),
  }),
});
