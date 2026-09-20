import { Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/api-response";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserProfile((req as any).user?.id || "u-1");
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});
