'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type EditCategoryState = {
    success: boolean,
    error: string | null
}

export async function editMenuCategory(
    prevState: EditCategoryState,
    formData: FormData
): Promise<EditCategoryState> {

    const categoryId = formData.get('categoryId')
    const categoryName = formData.get('categoryName') as string
    const restaurantId = formData.get('restaurantId')

    if (!categoryName || !categoryId || !restaurantId) {
        return {
            success: false,
            error: 'Datos inválidos'
        }
    }

    try {
        const result = await prisma.menuCategory.updateMany({
            where: {
                id: Number(categoryId),
                restaurantId: Number(restaurantId),
            },
            data: {
                category: categoryName,
            },
        })

        if (result.count === 0) {
            return {
                success: false,
                error: 'Categoría no encontrada o no autorizada'
            }
        }

        revalidatePath('/dashboard')

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