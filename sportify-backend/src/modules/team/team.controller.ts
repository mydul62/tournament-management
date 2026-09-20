import { Request, Response } from "express";
import { TeamService } from "./team.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/api-response";

export const getTeams = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.getAllTeams();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Teams retrieved successfully",
    data: result,
  });
});

export const getTeamById = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.getTeamById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team details retrieved successfully",
    data: result,
  });
});

export const createTeam = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamService.createTeam(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Team created successfully",
    data: result,
  });
});
