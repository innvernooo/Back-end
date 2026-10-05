import express, { Request, Response } from 'express';
import fs from 'fs';
import pool from './configs/pool-connection.config';
import { productsRoute } from './routes/products.route';

const PORT: number = 8003;

const app = express();
app.use(express.json());

app.use('/api/v1', productsRoute);

pool.connect((err, client, release) => {
  if (err) return console.log(`Error acquiring client ${err.stack}`);

  console.log('Connection successful');

  release();
});

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
