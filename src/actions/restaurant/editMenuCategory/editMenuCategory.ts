'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { captureServiceError } from "@/lib/sentry"

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

        const category = await prisma.menuCategory.findUnique({
            where: { id: Number(categoryId) },
            select: { restaurantId: true }
        })

        if (!category) {
            return {
                success: false,
                error: 'Categoría no encontrada'
            }
        }

        await prisma.menuCategory.update({
            where: { id: Number(categoryId) },
            data: { category: categoryName }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            error: null
        }
    } catch (error) {
        captureServiceError(error, {
            level: 'error',
            service: 'editMenuCategory',
            action: 'EditCategoryAction',
            extra: {
                categoryId,
                restaurantId,
                categoryName
            }
        })

        return {
            success: false,
            error: 'Error de servidor'
        }
    }
}