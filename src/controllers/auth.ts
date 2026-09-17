import type { Request, Response } from 'express';

export const getCurrentUser = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      userId: "user_001",
      email: "user@example.com",
      name: "John Doe",
      createdAt: "2026-01-01T00:00:00Z"
    },
    error: null
  });
};

export const register = (req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {
      userId: "user_002",
      email: "newuser@example.com",
      name: "Jane Doe",
      createdAt: "2026-01-01T00:00:00Z"
    },
    error: null
  });
};

export const login = (req: Request, res: Response): void => {
  res.status(200).json({
   success: true,   
   data: {},   
   error: null 
  });
};
