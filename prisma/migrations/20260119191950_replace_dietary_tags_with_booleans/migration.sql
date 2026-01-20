/*
  Warnings:

  - You are about to drop the column `dietaryTags` on the `Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "dietaryTags",
ADD COLUMN     "isDairyFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isGlutenFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isKeto" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isNutFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSpicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVegan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVegetarian" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "DietaryTag";
