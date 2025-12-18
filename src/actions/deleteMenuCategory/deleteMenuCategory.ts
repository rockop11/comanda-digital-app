'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type DeleteCategoryState = {
    success: boolean;
    error: string | null;
};

export async function deleteMenuCategory(
    prevState: DeleteCategoryState,
    formData: FormData
): Promise<DeleteCategoryState> {
    const categoryId = Number(formData.get('categoryId'));
    const restaurantId = Number(formData.get('restaurantId'));

    if (!categoryId || !restaurantId) {
        return {
            success: false,
            error: 'Datos Invalidos'
        }
    }

    try {
        await prisma.dish.deleteMany({
            where: {
                menuCategoryId: categoryId,
            },
        });

        await prisma.menuCategory.delete({
            where: {
                id: categoryId,
            },
        });

        revalidatePath(`/dashboard`);

        return {
            success: true,
            error: null
        }
    } catch (error) {
        return {
            success: false,
            error: 'Error de servidor'
        }
    }



}