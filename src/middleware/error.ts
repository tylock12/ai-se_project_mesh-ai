import type { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  console.log(`Route ${req.method} ${req.path} not found`);
  res.status(404).json({
    "success": false,
    "data": null,
    "error": `Route ${req.method} ${req.path} not found`
  });
};

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(`Error: ${err.message}`);
  res.status(500).json({
    "success": false,
    "data": null,
    "error": "An error has occurred on the server"
  });
};
