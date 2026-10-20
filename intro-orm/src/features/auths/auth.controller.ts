import 'dotenv/config';
import { Request, Response } from 'express';
import { validate } from '../../validators/validate';
import { loginSchema, RegisterSchema, staffRegisterSchema } from '../../validators/auth.validator';
import { AuthService } from './auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { body } = validate(RegisterSchema, { body: req.body });

    const { staffWithoutPassword } = await AuthService.register({ body });

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
      secure: process.env.NODE_ENV === 'PRODUCTION',
      sameSite: 'lax',
    });

    res.status(201).json({
      success: true,
      message: 'Staff logged in successfully',
      data: safeStaff,
    });
  }

  static async me(req: Request, res: Response) {
    const { payload } = res?.locals;

    const staff = await AuthService.me(payload?.id);

    res.status(200).json({
      success: true,
      message: 'Session login valid',
      data: staff,
    });
  }

  static async staffRegister(req: Request, res: Response) {
    const { body } = validate(staffRegisterSchema, { body: req.body });

    const staff = await AuthService.staffRegister({ body });

    res.status(201).json({
      success: true,
      message: 'Staff registered valid',
      data: staff,
    });
  }
}
