/*
LAYER CONTROLLER
1. Menghandle Request dan Response
*/

import { Request, Response } from 'express';
import { createWarehouseService } from '../services/products.service';

export const createWarehouseController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
    } = req.body;

    await createWarehouseService({
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
    });

    res.status(201).json({
      success: true,
      message: 'Creating Product Successful',
      data: {
        product_code,
        product_name,
        category,
        supplier_name,
        unit_price,
        stock_quantity,
        minimum_stock,
        warehouse_zone,
        status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Creating Product Failed',
      data: {},
    });
  }
};
