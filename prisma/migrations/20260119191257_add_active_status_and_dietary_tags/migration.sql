-- CreateEnum
CREATE TYPE "DietaryTag" AS ENUM ('VEGAN', 'VEGETARIAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'NUT_FREE', 'SPICY', 'ORGANIC');

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "dietaryTags" "DietaryTag"[],
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
