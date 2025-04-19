/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Bookshelf" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    CONSTRAINT "Bookshelf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bookshelf_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookshelf_userId_bookId_key" ON "Bookshelf"("userId", "bookId");

-- CreateIndex
CREATE UNIQUE INDEX "books_id_key" ON "books"("id");
