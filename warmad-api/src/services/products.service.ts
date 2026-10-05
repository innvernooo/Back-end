import pool from '../configs/pool-connection.config';

enum Category {
  'Perkakas',
  'Sembako',
  'lain-lain',
}
interface Products {
  title: string;
  price: number;
  description: string;
  stock: number;
  category: Category;
}

export const createProductsService = async ({
  title,
  price,
  description,
  stock,
  category,
}: Products) => {
  await pool.query(
    `insert into warmad_products.product(title, price, description, stock, category) values($1, $2, $3, $4, $5)`,
    [title, price, description, stock, category],
  );
};
