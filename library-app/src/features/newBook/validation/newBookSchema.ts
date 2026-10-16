import * as z from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

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
  cover: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'At least one image is required')
    .refine((files) => files.length <= 3, 'Maximum 3 images are allowed')
    .transform((files) => Array.from(files))
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      'Each image must not exceed 5 MB',
    )
    .refine(
      (files) =>
        files.every((file) => {
          const extension = file.name.split('.').pop()?.toLowerCase();
          return extension && ALLOWED_EXTENSIONS.includes(extension);
        }),
      'Only JPG, JPEG, PNG, WEBP, and SVG images are allowed',
    ),
});

export type NewBookInput = z.input<typeof NewBookSchema>;
export type NewBookOutput = z.output<typeof NewBookSchema>;
