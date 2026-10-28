import type { Request, Response } from 'express';
import User from '../models/user.js';

export const getCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'Unauthorized' },
    });
    return;
  }

  const user = await User.findById(req.user.userId).select('-password');

  if (!user) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'User not found' },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: user,
    error: null,
  });
};