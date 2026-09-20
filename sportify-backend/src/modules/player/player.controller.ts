import { Request, Response } from "express";
import { PlayerService } from "./player.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/api-response";

export const getPlayers = catchAsync(async (req: Request, res: Response) => {
  const result = await PlayerService.getPlayers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Players retrieved successfully",
    data: result,
  });
});

export const createPlayer = catchAsync(async (req: Request, res: Response) => {
  const result = await PlayerService.createPlayer(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Player created successfully",
    data: result,
  });
});
