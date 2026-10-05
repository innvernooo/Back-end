import express from 'express';
import pool from './configs/pool-connection.config';
import { warehouseRoute } from './routes/products.route';

const PORT: number = 8004;

const app = express();
app.use(express.json());

app.use('/api/v1', warehouseRoute);

pool.connect((err, client, release) => {
  if (err) return console.log(`Error acquiring client ${err.stack}`);

  console.log('Connection successful');

  release();
});

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
