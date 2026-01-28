"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { captureException } from '@sentry/nextjs';

export type CreateCategoryState = {
    success: boolean;
    error: string | null;
};

export async function createMenuCategoryAction(
    prevState: CreateCategoryState,
    formData: FormData
): Promise<CreateCategoryState> {

    const categoryName = formData.get('categoryName') as string
    const restaurantId = formData.get('restaurantId')

    if (!categoryName || !restaurantId) {
        return {
            success: false,
            error: 'Datos Invalidos'
        }
    }

    try {
        await prisma.menuCategory.create({
            data: {
                category: categoryName,
                restaurantId: Number(restaurantId)
            }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            error: null
        }

    } catch (error) {
        captureException(error, {
            tags: {
                section: 'MenuCategory',
                action: 'CreateMenuCategory'
            },
            extra: {
                restaurantId: restaurantId,
                categoryName: categoryName,
                timestamp: new Date().toISOString()
            }
        })

        return {
            success: false,
            error: 'Error de servidor'
        }
    }
}
