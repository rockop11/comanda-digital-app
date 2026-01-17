'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type EditRestaurantNameProps = {
    success: boolean,
    error: string | null
}

export async function editRestaurantName(
    prevState: EditRestaurantNameProps,
    formData: FormData
): Promise<EditRestaurantNameProps> {

    const restaurantName = formData.get('restaurantName') as string
    const restaurantId = formData.get('restaurantId')

    if (!restaurantName || !restaurantId) {
        return {
            success: false,
            error: 'Datos invalidos'
        }
    }

    try {
        await prisma.restaurant.update({
            where: {
                id: Number(restaurantId)
            },
            data: {
                name: restaurantName
            }
        })

        revalidatePath('dashboard')

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