/*
  Warnings:

  - Added the required column `name` to the `Buyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "name" TEXT NOT NULL;
