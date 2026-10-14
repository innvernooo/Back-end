import * as z from 'zod';

export const NewBookSchema = z.object({
  title: z
    .string()
    .min(10, 'At least 10 characters')
    .max(100, 'Maximum is 100 caharters'),
  authorId: z
    .string()
    .min(10, 'At least 10 characters')
    .max(50, 'Maximum is 50 caharters'),
  categoryId: z
    .string()
    .min(10, 'At least 10 characters')
    .max(50, 'Maximum is 50 caharters'),
});

export type NewBookRequest = z.infer<typeof NewBookSchema>;
