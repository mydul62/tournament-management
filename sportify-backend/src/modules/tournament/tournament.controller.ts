import { Request, Response } from "express";
import { TournamentService } from "./tournament.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/api-response";

export const getTournaments = catchAsync(async (req: Request, res: Response) => {
  const result = await TournamentService.getAllTournaments();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tournaments retrieved successfully",
    data: result,
  });
});

export const getTournamentById = catchAsync(async (req: Request, res: Response) => {
  const result = await TournamentService.getTournamentById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tournament details retrieved successfully",
    data: result,
  });
});

export const getTournamentStandings = catchAsync(async (req: Request, res: Response) => {
  const result = await TournamentService.getTournamentStandings(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tournament standings retrieved successfully",
    data: result,
  });
});

export const createTournament = catchAsync(async (req: Request, res: Response) => {
  const result = await TournamentService.createTournament(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tournament created successfully",
    data: result,
  });
});
