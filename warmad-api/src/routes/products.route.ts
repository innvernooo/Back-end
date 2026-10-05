/*
LAYER ROUTER:
1. Mendifinisikan HTTP method
2. Mendefinisikan route URL
*/

import { Router } from 'express';
import { createProductsController } from '../controllers/products.controller';

export const productsRoute = Router();

productsRoute.post('/products', createProductsController);
