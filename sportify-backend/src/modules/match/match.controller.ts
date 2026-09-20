import { Request, Response } from "express";
import { MatchService } from "./match.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/api-response";

export const getMatches = catchAsync(async (req: Request, res: Response) => {
  const result = await MatchService.getAllMatches();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Matches retrieved successfully",
    data: result,
  });
});

export const getLiveMatches = catchAsync(async (req: Request, res: Response) => {
  const result = await MatchService.getLiveMatches();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Live matches retrieved successfully",
    data: result,
  });
});

export const getMatchById = catchAsync(async (req: Request, res: Response) => {
  const result = await MatchService.getMatchById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Match details retrieved successfully",
    data: result,
  });
});

export const updateMatchScore = catchAsync(async (req: Request, res: Response) => {
  const { homeScore, awayScore, minute } = req.body;
  const result = await MatchService.updateScore(req.params.id, homeScore, awayScore, minute);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Match score updated successfully",
    data: result,
  });
});
