import { z } from "zod";

export const createPlayerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    position: z.string(),
    teamId: z.string(),
    number: z.number().optional(),
  }),
});
