'use server'

import { prisma } from "@/lib/prisma"
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
        console.error('Error:', error)
        return { success: false, error: 'Error al actualizar' }
    }
}