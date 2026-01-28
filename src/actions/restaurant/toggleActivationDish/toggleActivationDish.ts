'use server'

import { prisma } from "@/lib/prisma"
import { captureServiceError } from "@/lib/sentry"
import { revalidatePath } from "next/cache"

export async function toggleActivationDish(dishId: number, isActive: boolean) {
    try {
        await prisma.dish.update({
            where: { id: dishId },
            data: { isActive }
        })

        revalidatePath('/dashboard')

        return { success: true }
    } catch (error) {
        captureServiceError(error, {
            level: 'error',
            service: 'toggleActivationDish',
            action: 'ToggleActivationDish',
            extra: {
                dishId,
                isActive
            }
        })
        return { success: false, error: 'Error al actualizar' }
    }
}