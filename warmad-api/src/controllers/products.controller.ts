/*
LAYER CONTROLLER
1. Menghandle Request dan Response
*/

import { Request, Response } from 'express';
import { createProductsService } from '../services/products.service';

export const createProductsController = async (req: Request, res: Response) => {
  try {
    const { title, price, category, stock, description } = req.body;

    await createProductsService({ title, price, category, stock, description });

    res.status(201).json({
      success: true,
      message: 'Creating Product Successful',
      data: {
        title,
        price,
        category,
        stock,
        description,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Creating Product Successful',
      data: {},
    });
  }
};
