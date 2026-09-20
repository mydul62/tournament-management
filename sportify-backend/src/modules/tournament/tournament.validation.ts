import { z } from "zod";

export const createTournamentSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Tournament name must be at least 3 characters"),
    description: z.string().optional(),
    bannerUrl: z.string().optional(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    format: z.enum(["LEAGUE", "KNOCKOUT", "GROUP_AND_KNOCKOUT"]).default("LEAGUE"),
  }),
});
