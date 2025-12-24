/*
  Warnings:

  - You are about to drop the column `wifiId` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the `Wifi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_wifiId_fkey";

-- DropIndex
DROP INDEX "Restaurant_wifiId_key";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "wifiId";

-- DropTable
DROP TABLE "Wifi";
