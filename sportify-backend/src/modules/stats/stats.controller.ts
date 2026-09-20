import { Request, Response } from "express";
import { StatsService } from "./stats.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/api-response";

export const getTopScorers = catchAsync(async (req: Request, res: Response) => {
  const result = await StatsService.getTopScorers(req.query.tournamentId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Top scorers retrieved successfully",
    data: result,
  });
});

export const getTopAssists = catchAsync(async (req: Request, res: Response) => {
  const result = await StatsService.getTopAssists(req.query.tournamentId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Top assists retrieved successfully",
    data: result,
  });
});
