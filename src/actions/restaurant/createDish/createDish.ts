'use server'

import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { captureServiceError } from "@/lib/sentry";

export type CreateDishState = {
    success: boolean;
    error: string | null;
}

const getBlobToken = () => {
    if (process.env.NODE_ENV === 'development') {
        return process.env.BLOB_READ_WRITE_TOKEN_DEV_READ_WRITE_TOKEN;
    }

    return process.env.BLOB_READ_WRITE_TOKEN;
}

export async function createDish(
    prevState: CreateDishState,
    formData: FormData
): Promise<CreateDishState> {

    const restaurantId = formData.get('restaurantId')
    const categoryId = formData.get('categoryId')
    const dishTitle = formData.get('dishTitle') as string
    const dishPrice = formData.get('dishPrice')
    const dishDescription = formData.get('dishDescription') as string
    const dishImage = formData.get('dishImage') as File || null

    const isVegan = formData.get('isVegan') === 'on'
    const isVeggie = formData.get('isVeggie') === 'on'
    const isGlutenFree = formData.get('isGlutenFree') === 'on'
    const isDairyFree = formData.get('isDairyFree') === 'on'
    const isSpicy = formData.get('isSpicy') === 'on'

    if (!categoryId) {
        return {
            success: false,
            error: 'Categoría inválida*'
        }
    }

    if (!dishTitle || !dishPrice) {
        return {
            success: false,
            error: 'Debe completar los campos obligatorios*'
        }
    }

    try {
        const newDish = await prisma.dish.create({
            data: {
                name: dishTitle,
                price: Number(dishPrice),
                description: dishDescription || null,
                isVegan,
                isVegetarian: isVeggie,
                isGlutenFree,
                isDairyFree,
                isSpicy,
                menuCategoryId: Number(categoryId)
            }
        })

        if (dishImage && dishImage.size > 0) {
            try {
                const blobToken = getBlobToken()

                if (!blobToken) {
                    captureServiceError(new Error('Blob token not configured'), {
                        service: 'createDish',
                        action: 'BlobTokenMissing',
                        level: 'warning',
                        extra: { dishId: newDish.id }
                    })
                } else {
                    const ext = dishImage.name.split('.').pop()
                    const blobPath = `restaurants/${restaurantId}/dishes/${newDish.id}/image.${ext}`

                    const { url } = await put(blobPath, dishImage, {
                        access: 'public',
                        token: blobToken,
                        contentType: dishImage.type
                    })

                    await prisma.dish.update({
                        where: { id: newDish.id },
                        data: { image: url }
                    })
                }
            } catch (blobError) {
                captureServiceError(blobError, {
                    service: 'createDish',
                    action: 'UploadBlobImage',
                    level: 'warning',
                    extra: {
                        dishId: newDish.id,
                        restaurantId,
                        fileName: dishImage.name
                    }
                })

                console.error('Error al subir imagen:', blobError)
            }
        }

        revalidatePath('/dashboard')

        return {
            success: true,
            error: null
        }

    } catch (error) {
        captureServiceError(error, {
            service: 'createDish',
            action: 'CreateDishAction',
            extra: {
                restaurantId: restaurantId,
                categoryId: categoryId,
                dishTitle: dishTitle,
                dishPrice: dishPrice
            }
        })

        return {
            success: false,
            error: 'Error del servidor'
        }
    }
}