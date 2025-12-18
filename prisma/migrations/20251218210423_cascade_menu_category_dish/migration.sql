-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_menuCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
