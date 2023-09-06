/*
  Warnings:

  - Added the required column `color` to the `publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fipe` to the `publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "fipe" INTEGER NOT NULL,
ADD COLUMN     "fuel" TEXT NOT NULL;
