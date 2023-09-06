/*
  Warnings:

  - Made the column `street` on table `addresses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "street" DROP DEFAULT;
