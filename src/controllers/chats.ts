import type { Request, Response } from 'express';

export const getChats = (req: Request, res: Response): void => {
  res.status(200).json({ success: true, data: {}, error: null });
};

export const createChat = (req: Request, res: Response): void => {
  res.status(201).json({ success: true, data: {}, error: null });
};

export const getChat = (req: Request, res: Response): void => {
  res.status(200).json({ success: true, data: {}, error: null });
};

export const deleteChat = (req: Request, res: Response): void => {
  res.status(204).end();
};

export const sendMessage = (req: Request, res: Response): void => {
  res.status(201).json({ success: true, data: {}, error: null });
};
