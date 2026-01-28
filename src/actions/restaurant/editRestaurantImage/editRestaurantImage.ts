'use server'
import { prisma } from "@/lib/prisma"
import { captureServiceError } from "@/lib/sentry"
import { put, del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export type EditRestaurantImageProps = {
    success: boolean,
    error: string | null
}

const getBlobToken = () => {
    if (process.env.NODE_ENV === 'development') {
        return process.env.BLOB_READ_WRITE_TOKEN_DEV_READ_WRITE_TOKEN;
    }

    return process.env.BLOB_READ_WRITE_TOKEN;
}

export async function editRestaurantImage(
    prevState: EditRestaurantImageProps,
    formData: FormData
): Promise<EditRestaurantImageProps> {

    const restaurantId = formData.get('restaurantId')
    const imageFile = formData.get('imageFile') as File

    if (!restaurantId || !imageFile) {
        return {
            success: false,
            error: 'Datos inválidos'
        }
    }

    try {
        const blobToken = getBlobToken()

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: Number(restaurantId)
            }
        })

        if (!restaurant) {
            return {
                success: false,
                error: 'Restaurante no encontrado'
            }
        }

        const blobPath = `restaurants/${restaurant.id}/logo-${Date.now()}.${imageFile.name.split('.').pop()}`;

        const { url: newImageUrl } = await put(blobPath, imageFile, {
            access: 'public',
            contentType: imageFile.type,
            token: blobToken
        })

        await prisma.restaurant.update({
            where: { id: Number(restaurantId) },
            data: { image: newImageUrl }
        })

        if (restaurant.image) {
            await del(restaurant.image, { token: blobToken })
        }

        revalidatePath('/dashboard')

        return {
            success: true,
            error: null
        }
    } catch (error) {
        captureServiceError(error, {
            level: 'error',
            service: 'editRestaurantImage',
            action: 'editRestaurantImagenAction',
            extra: {
                restaurantId,
                imageFile: imageFile.name
            }
        })
        return {
            success: false,
            error: 'Error al actualizar la imagen del restaurante'

        }
    }
}