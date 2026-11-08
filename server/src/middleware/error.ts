import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.info(`Route ${req.method} ${req.path} not found`);
  res.status(404).json({
    success: false,
    data: null,
    error: { message: `Route ${req.method} ${req.path} not found` },
  });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err.message, { stack: err.stack});
  res.status(500).json({
    success: false,
    data: null,
    error: { message: "An error has occurred on the server" },
  });
};
