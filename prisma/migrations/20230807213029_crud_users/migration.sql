/*
  Warnings:

  - You are about to drop the column `fipe` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `publications` table. All the data in the column will be lost.
  - Added the required column `coverImg` to the `publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isGoodSale` to the `publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publications" DROP COLUMN "fipe",
DROP COLUMN "images",
ADD COLUMN     "coverImg" TEXT NOT NULL,
ADD COLUMN     "isGoodSale" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "publicationsId" INTEGER NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_publicationsId_key" ON "Images"("publicationsId");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_publicationsId_fkey" FOREIGN KEY ("publicationsId") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
