/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "book_id_key" ON "book"("id");
