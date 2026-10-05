# Laporan Exercise SQL Backend - Warehouse System

## Task 1 - Selecting Specific Columns · API Projection

### perintah SQL

select product_code, product_name, category, stock_quantity from warehouse_products.products
.
Menggunakan syntax "select", kemudian memilih table mana yang ingin ditunjukan

## Task 2 - Composite Filtering · Multiple Conditions

### perintah SQL

select product_code, product_name, category, stock_quantity from warehouse products.products
where stock_quantity <= minimum_stock and category = 'Packaging';
.
Menggunakan syntax "select", kemudian memilih table mana yang ingin ditunjukan
kemudian pake klausa "Where" untuk mebuat perbandingan stock_quantity dengan minimum_stock, dan menunjuk kategori "packaging"

## Task 3 - Pagination · LIMIT & OFFSET

### perintah SQL

select _ from warehouse_products.products
order by unit_price desc;
.
Menggunakan syntax "select _", yang berarti menunjuk semua table
Menggunakan klausa "order by", kemudian tunjuk unit_price dengan mode desc atau "Descending"

## Task 4 - Data Update · Restock Mutation

### perintah SQL

update warehouse_products.products
set stock_quantity = 50, last_restock_date = current_timestamp
where product_code = 'PRD-002';
.
Menggunakan syntax "update"
menggunakan set untuk memperbarui data baru ke table

## Task 5 - Soft Delete Pattern Simulation

### perintah SQL

update warehouse_products.products
set status = 'Archived'
where product_code = 'PRD-007';
.
Menggunakan syntax "update"
sama seperti nomor 4, Task 5 hanya mengubah table yang ada dalam table status menjadi "Archived"


# Laporan Inregrasi Backend - http://localhost:8004/api/v1/warehouse

## Request
Saya hanya membuat method untuk tambah data, menggunakan POST

## Hasil Test Postman
http://localhost:8004/api/v1/warehouse

## Penjelasan
Menggunakan method `POST` dengan query `INSERT INTO` untuk menambahkan data produk baru