import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, data: null, error: { message: 'Missing or invalid authorization token' } });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ success: false, data: null, error: { message: 'Missing or invalid authorization token' } });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch {
    res.status(401).json({ success: false, data: null, error: { message: 'Invalid or expired token' } });
  }
};