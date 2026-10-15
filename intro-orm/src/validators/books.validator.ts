import * as z from 'zod';

const title = z
  .string()
  .min(1, 'Title is required')
  .max(200, 'Title has maximum 200 characters');

const authorId = z
  .string()
  .min(1, 'Author ID is required')
  .max(100, 'Author ID has maximum 100 characters');

const categoryId = z
  .string()
  .min(1, 'Category ID is required')
  .max(100, 'Category ID has maximum 100 characters');

export const createBookSchema = z.object({
  body: z.object({
    title,
    authorId,
    categoryId,
  }),
});

export const getBookSchema = z.object({
  query: z.object({
    page: z.coerce.number('Input must be a number').optional().default(1),
    limit: z.coerce.number('Input must be a number').optional().default(10),
  }),
});

export const updateBookSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1, 'Id is required')
      .max(60, 'Id has maximum 60 characters'),
  }),
  body: z.object({
    title,
    authorId,
    categoryId,
  }),
});

export type CreateBookRequest = z.infer<typeof createBookSchema>;
export type GetBookRequest = z.infer<typeof getBookSchema>;
export type UpdateBookRequest = z.infer<typeof updateBookSchema>;
