import { z } from "zod";

export const getAuditLogsSchema = z.object({
  query: z.object({
    entity: z.string().optional(),
  }),
});
