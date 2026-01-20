/*
  Warnings:

  - You are about to drop the column `isKeto` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `isNutFree` on the `Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "isKeto",
DROP COLUMN "isNutFree";
