import { Request, Response } from "express";
import { AuditService } from "./audit.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/api-response";

export const getAuditLogs = catchAsync(async (req: Request, res: Response) => {
  const result = await AuditService.getAuditLogs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Audit logs retrieved successfully",
    data: result,
  });
});
