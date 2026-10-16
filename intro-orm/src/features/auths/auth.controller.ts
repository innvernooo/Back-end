import { Request, Response } from 'express';
import { validate } from '../../validators/validate';
import { loginSchema, RegisterSchema } from '../../validators/auth.validator';
import { AuthService } from './auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { body } = validate(RegisterSchema, { body: req.body });

    const {staffWithoutPassword} = await AuthService.register({ body });

    res.status(201).json({
      success: true,
      message: 'Staff registered successfully',
      data: staffWithoutPassword,
    });
  }

  static async login(req: Request, res: Response) {
    const { body } = validate(loginSchema, { body: req.body });

    const { token, safeStaff } = await AuthService.login({ body });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.status(201).json({
      success: true,
      message: 'Staff logged in successfully',
      data: safeStaff,
    });
  }
}
