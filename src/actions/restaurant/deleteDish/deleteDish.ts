'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { del } from "@vercel/blob"
import { captureServiceError } from "@/lib/sentry"

export type DeleteDishState = {
    success: boolean;
    error: string | null;
}

export async function deleteDish(
    initialState: DeleteDishState,
    formData: FormData
): Promise<DeleteDishState> {

    const dishId = formData.get('dishId')

    try {
        const dish = await prisma.dish.findUnique({
            where: {
                id: Number(dishId)
            }
        })

        if (!dish) {
            return {
                success: false,
                error: 'Plato no encontrado'
            }
        }

        await prisma.dish.delete({
            where: { id: Number(dishId) }
        })

        if (dish.image) {
            try {
                await del(dish.image)
            } catch (blobError) {
                captureServiceError(blobError, {
                    service: 'createDish',
                    action: 'UploadBlobImage',
                    level: 'warning',
                    extra: {
                        dishId: dishId,
                    }
                })
                console.error('Error al eliminar imagen de Blob:', blobError)
            }
        }

        revalidatePath('/dashboard')

        return {
            success: true,
            error: null
        }

    } catch (error) {
        captureServiceError(error, {
            level: 'error',
            service: 'DeleteDish',
            action: 'DeleteDishAction',
            extra: {
                dishId: dishId
            }
        })
        return {
            success: false,
            error: 'Error del servidor'
        }
    }
}