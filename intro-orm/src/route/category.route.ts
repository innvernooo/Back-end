import { Router } from "express";
import { createCategoryController } from "../controller/category.controller";

export const categoriesRouter = Router();

categoriesRouter.post('/', createCategoryController)