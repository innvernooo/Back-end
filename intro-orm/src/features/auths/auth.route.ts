import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

export const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.get('/me', authenticate, AuthController.me);
authRouter.post(
  '/staffRegister',
  authenticate,
  authorize(['ADMIN']),
  AuthController.staffRegister,
);
