import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    avatar: z.string().optional(),
  }),
});
