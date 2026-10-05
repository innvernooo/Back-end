import { Router } from 'express';
import { createWarehouseController } from '../controllers/products.controller';

export const warehouseRoute = Router();

warehouseRoute.post('/warehouse', createWarehouseController);
