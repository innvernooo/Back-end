import { Request, Response } from 'express';
import {
  createCategoryService,
  getCategoryService,
} from '../service/category.service';
import { Categories } from '../generated/prisma/enums';

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await createCategoryService(name);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: {},
    });
  }
};

export const getCategoryController = async (req: Request, res: Response) => {
  try {
    const category = await getCategoryService();

    res.status(201).json({
      success: true,
      message: 'Category retrieved successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: {},
    });
  }
};
