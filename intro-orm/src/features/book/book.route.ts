import { Router } from 'express';
import { BooksController } from './book.controller';

export const booksRouter = Router();

booksRouter.post('/', BooksController.create);
booksRouter.put('/:id', BooksController.update);
booksRouter.get('/', BooksController.get);
