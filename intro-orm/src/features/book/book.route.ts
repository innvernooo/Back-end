import { Router } from 'express';
import { BooksController } from './book.controller';
import { uploadMiddleware } from '../../middlewares/uploadMiddleware';

export const booksRouter = Router();

booksRouter.post(
  '/',
  uploadMiddleware(['jpg', 'png', 'svg'], 'MEMORY').fields([
    { name: 'coverImage', maxCount: 1 },
  ]),
  BooksController.create,
);
booksRouter.put('/:id', BooksController.update);
booksRouter.get('/', BooksController.get);
booksRouter.delete('/:id', BooksController.delete);
