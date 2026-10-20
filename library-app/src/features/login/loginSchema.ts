import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(
      z
        .email('Invalid email format')
        .min(1, 'Email is required')
        .max(150, 'Max length is 150 caharcters'),
    ),

  password: z
    .string()
    .min(1, 'Password is required')
    .max(250, 'Max length is 250 caharcters'),
});

export type LoginRequest = z.infer<typeof loginSchema>;
