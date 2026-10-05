import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',  
  port: 5432,
  database: 'warehouse_db',
  password: 'Graduation22324',
});

export default pool;
