/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `author` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "author_name_key" ON "author"("name");
