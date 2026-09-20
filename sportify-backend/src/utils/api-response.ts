import { Response } from "express";

export function sendResponse<T>(
  res: Response,
  data: {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: T;
  }
) {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
}
