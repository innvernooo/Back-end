import * as z from 'zod';

const name = z
  .string()
  .min(1, 'Name is required')
  .max(100, 'Maximum input is 100 characters');

const email = z
  .email('Input must be email')
  .max(50, 'Maximum input is 50 characters');

const password = z
  .string()
  .min(5, 'Minimum input is 5 characters')
  .max(15, 'Maximum input is 15 characters');

const phoneNumber = z
  .string()
  .min(1, 'Phone number is required')
  .max(15, 'Maximum input is 15 characters');

const branchId = z
  .string()
  .min(1, 'Phone number is required')
  .max(50, 'Maximum input is 50 characters');

const role = z.enum(['STAFF', 'ADMIN'], 'Role must be STAFF or ADMIN');

export const RegisterSchema = z.object({
  body: z.object({
    name,
    email,
    password,
    phoneNumber,
    branchId,
    role,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email,
    password,
  }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
