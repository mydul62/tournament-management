import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";
import { AppError } from "../utils/app-error";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new AppError("Forbidden. You do not have permission for this action.", 403)
      );
    }
    next();
  };
};
