import { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/api-response";

export const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id || "u-1";
  const result = await NotificationService.getUserNotifications(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notifications retrieved successfully",
    data: result,
  });
});
