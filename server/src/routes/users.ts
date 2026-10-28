import { Router } from 'express';
import { getCurrentUser } from '../controllers/user';
import { auth } from '../middleware/auth';

const usersRouter = Router();
usersRouter.use(auth);

usersRouter.get('/me', getCurrentUser);

export { usersRouter };
