'use server'

import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export type CreateDishState = {
    success: boolean;
    error: string | null;
}

const getBlobToken = () => {
    if (process.env.NODE_ENV === 'development') {
        return process.env.BLOB_READ_WRITE_TOKEN_DEV_READ_WRITE_TOKEN;
    }

    return process.env.BLOB_READ_WRITE_TOKEN_PROD;
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
            const blobToken = getBlobToken()

            if (!blobToken) {
                return {
                    success: false,
                    error: 'Token de almacenamiento no configurado'
                }
            }

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

        revalidatePath('/dashboard')

        return {
            success: true,
            error: null
        }

    } catch (error) {
        return {
            success: false,
            error: 'Error del servidor'
        }
    }
}