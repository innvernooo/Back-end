import 'dotenv/config';
import { prisma } from '../../configs/prisma-client.config';
import { AppError } from '../../errors/app.error';
import { Bcrypt } from '../../lib/bcrypt.lib';
import { Jwt } from '../../lib/jwt.lib';
import { LoginInput, RegisterInput } from '../../validators/auth.validator';
import bcrypt from 'bcryptjs';

export class AuthService {
  static async register({ body }: RegisterInput) {
    const findStaffByEmail = await prisma.staff.findUnique({
      where: {
        email: body?.email,
      },
    });

    if (findStaffByEmail) throw new AppError(409, 'Email already existed');

    // const passwordHashed = await Bcrypt.hashPassword(body?.password);

    const staff = await prisma.staff.create({
      data: {
        ...body,
        password: await bcrypt.hash(body.password, 10),
      },
    });
    const { password, phoneNumber, ...staffWithoutPassword } = staff;

    return {
      staffWithoutPassword,
    };
  }

  static async login({ body }: LoginInput) {
    const findStaffByEmail = await prisma.staff.findUnique({
      where: {
        email: body?.email,
      },
    });

    console.log(findStaffByEmail);
    if (!findStaffByEmail)
      throw new AppError(404, 'Email or password is incorrect');

    const isComparredPassword = await Bcrypt.comparredPassword(
      body?.password,
      findStaffByEmail?.password!,
    );
    console.log(isComparredPassword)

    if (!isComparredPassword)
      throw new AppError(404, 'Email or password is incorrect');

    const token = await Jwt.generate(
      {
        id: findStaffByEmail?.id,
        role: findStaffByEmail?.role,
        email: findStaffByEmail?.email,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: '10m' },
    );
    console.log(token);
    const { password, phoneNumber, ...safeStaff } = findStaffByEmail;

    return {
      token,
      safeStaff,
    };
  }
}
