import { z } from "zod";

export const getStatsQuerySchema = z.object({
  query: z.object({
    tournamentId: z.string().optional(),
  }),
});
