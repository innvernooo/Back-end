import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error';
import { Jwt } from '../lib/jwt.lib';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) throw new AppError(401, 'Token must be provide');

  const payload = await Jwt.verify(token, process.env.JWT_SECRET_KEY!);

  res.locals.payload = payload;

  next();
};

export const authorize = (allowedRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const payload = res.locals.payload;

    if (!allowedRole.includes(payload?.role))
      return next(new AppError(403, 'Unauthorize user role'));

    next();
  };
};
