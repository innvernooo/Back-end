import * as z from 'zod';

const emptyToUndefined = (v: unknown) =>
  typeof v === 'string' && v.trim() === '' ? undefined : v;

export const staffRegisterSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Maximum input is 100 characters'),

  email: z
    .email('Input must be email')
    .max(50, 'Maximum input is 50 characters'),
  password: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .min(5, 'Minimum input is 5 characters')
      .max(15, 'Maximum input is 15 characters')
      .optional(),
  ),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .max(15, 'Maximum input is 15 characters'),

  branchId: z
    .string()
    .min(1, 'Branch ID is required')
    .max(50, 'Maximum input is 50 characters'),

  role: z.enum(['STAFF', 'ADMIN'], 'Role must be STAFF or ADMIN'),
});

export type StaffRegisterInput = z.input<typeof staffRegisterSchema>;
export type StaffRegisterOutput = z.output<typeof staffRegisterSchema>;
