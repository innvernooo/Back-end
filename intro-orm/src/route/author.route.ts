import { Router } from 'express';
import {
  createAuthorController,
  deleteAuthorController,
  getAuthorsController,
  selectAuthorController,
  updateAuthorController,
} from '../controller/author.controller';

export const authorsRoute = Router();

authorsRoute.post('/', createAuthorController);
authorsRoute.put('/:id', updateAuthorController);
authorsRoute.delete('/:id', deleteAuthorController);
authorsRoute.get('/', getAuthorsController);
