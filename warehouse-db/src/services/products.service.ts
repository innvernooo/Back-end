import pool from '../configs/pool-connection.config';

enum Category {
  'Packaging',
  'Equipment',
  'Electronics',
  'Supplies',
  'Safety',
}

enum WarehouseZone {
  'Zone A',
  'Zone B',
  'Zone C',
  'Zone D',
}

enum Status {
  'Available',
  'Discontinued',
  'Archived',
}

interface Products {
  product_code: string;
  product_name: string;
  category: Category;
  supplier_name: string;
  unit_price: number;
  stock_quantity: number;
  minimum_stock: number;
  warehouse_zone: WarehouseZone;
  status: Status;
}

export const createWarehouseService = async ({
  product_code,
  product_name,
  category,
  supplier_name,
  unit_price,
  stock_quantity,
  minimum_stock,
  warehouse_zone,
  status,
}: Products) => {
  await pool.query(
    `INSERT INTO warehouse_products.products (product_code, product_name, category, supplier_name, unit_price, stock_quantity, minimum_stock, warehouse_zone, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      product_code,
      product_name,
      category,
      supplier_name,
      unit_price,
      stock_quantity,
      minimum_stock,
      warehouse_zone,
      status,
    ],
  );
};
