import { z } from "zod";

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Team name must be at least 2 characters"),
    shortName: z.string().min(2).max(5),
    logoUrl: z.string().optional(),
    stadium: z.string().optional(),
  }),
});
