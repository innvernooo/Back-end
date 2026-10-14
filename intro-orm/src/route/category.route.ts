import { Router } from 'express';
import {
  createCategoryController,
  getCategoryController,
} from '../controller/category.controller';

export const categoriesRouter = Router();

categoriesRouter.post('/', createCategoryController);
categoriesRouter.get('/', getCategoryController);
