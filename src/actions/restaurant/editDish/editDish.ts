'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { put, del } from "@vercel/blob"

export type EditDishState = {
    success: boolean;
    error: string | null
}

const getBlobToken = () => {
    if (process.env.NODE_ENV === 'development') {
        return process.env.BLOB_READ_WRITE_TOKEN_DEV_READ_WRITE_TOKEN;
    }

    return process.env.BLOB_READ_WRITE_TOKEN_PROD;
}

export async function editDish(
    prevState: EditDishState,
    formData: FormData
): Promise<EditDishState> {

    const restaurantId = formData.get('restaurantId')
    const dishId = formData.get('dishId')
    const dishName = formData.get('dishName')?.toString()
    const dishPrice = formData.get('dishPrice')
    const dishDescription = formData.get('dishDescription')?.toString()
    const dishImage = formData.get('dishImage') as File || null
    const isVeggie = formData.get('isVeggie') as string || null
    const isVegan = formData.get('isVegan') as string | null
    const isDairyFree = formData.get('isDairyFree') as string || null
    const isSpicy = formData.get('isSpicy') as string || null
    const isGlutenFree = formData.get('isGlutenFree') as string | null

    if (!dishId || !restaurantId) {
        return {
            success: false,
            error: 'No se encontró el producto'
        }
    }

    try {

        const currentDish = await prisma.dish.findUnique({
            where: { id: Number(dishId) },
            select: { image: true }
        })

        if (!currentDish) {
            return {
                success: false,
                error: 'El producto no existe*'
            }
        }

        const data: {
            name?: string;
            price?: number;
            description?: string;
            image?: string;
            isVegetarian?: boolean;
            isVegan?: boolean;
            isDairyFree?: boolean;
            isSpicy?: boolean;
            isGlutenFree?: boolean;
        } = {}

        if (dishName) data.name = dishName
        if (dishPrice) data.price = Number(dishPrice)
        if (dishDescription) data.description = dishDescription

        data.isVegetarian = isVeggie === 'on'
        data.isVegan = isVegan === 'on'
        data.isDairyFree = isDairyFree === 'on'
        data.isSpicy = isSpicy === 'on'
        data.isGlutenFree = isGlutenFree === 'on'


        if (dishImage && dishImage.size > 0) {
            const blobToken = getBlobToken()

            if (!blobToken) {
                return {
                    success: false,
                    error: 'Token de almacenamiento no configurado'
                }
            }

            const ext = dishImage.name.split('.').pop()
            const blobPath = `restaurants/${restaurantId}/dishes/${dishId}/image.${ext}`

            const { url } = await put(blobPath, dishImage, {
                access: 'public',
                token: blobToken,
                contentType: dishImage.type
            })

            data.image = url

            if (currentDish.image) {
                await del(currentDish.image)
            }
        }

        await prisma.dish.update({
            where: { id: Number(dishId) },
            data
        })

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