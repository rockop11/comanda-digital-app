'use server'
import { prisma } from '@/lib/prisma'
import { captureServiceError } from "@/lib/sentry"
import { revalidatePath } from "next/cache"

interface toggleActivationRestaurantResponse {
    success: boolean,
    error: string | null;
}

export const toggleActivationRestaurant = async (
    restaurantId: number,
    isActive: boolean
): Promise<toggleActivationRestaurantResponse> => {
    try {
        await prisma.restaurant.update({
            where: { id: restaurantId },
            data: { isActive }
        })

        revalidatePath('/admin')

        return { success: true, error: null }
    } catch (error) {
        captureServiceError(error, {
            level: 'error',
            action: 'toggle restaurant activation',
            page: 'superAdminPage',
            extra: {
                resutaurantId: restaurantId
            }
        })

        return { success: false, error: 'error de servidor' }
    }
}