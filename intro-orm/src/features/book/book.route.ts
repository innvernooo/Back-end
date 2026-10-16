import { Router } from 'express';
import { BooksController } from './book.controller';
import { uploadMiddleware } from '../../middlewares/uploadMiddleware';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

export const booksRouter = Router();

booksRouter.post(
  '/',
  authenticate,
  authorize(['ADMIN']),
  uploadMiddleware(['jpg', 'jpeg', 'png', 'webp', 'svg'], 'MEMORY').fields([
    { name: 'coverImage', maxCount: 1 },
  ]),
  BooksController.create,
);
booksRouter.put(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  BooksController.update,
);
booksRouter.get('/', BooksController.get);
booksRouter.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  BooksController.delete,
);
