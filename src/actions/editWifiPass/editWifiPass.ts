'use server'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type EditWifiPassProps = {
    success: boolean;
    error: string | null;
}

export async function editWifiPass(
    prevState: EditWifiPassProps,
    formData: FormData
): Promise<EditWifiPassProps> {

    const restaurantId = formData.get('restaurantId')
    const wifiPass = formData.get('wifiPass') as string

    if (!restaurantId || !wifiPass) {
        return {
            success: false,
            error: 'Faltan datos obligatorios'
        }
    }

    try {
        await prisma.restaurant.update({
            where: { id: Number(restaurantId) },
            data: { wifiPass: wifiPass }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            error: null
        }
    } catch (error) {
        return {
            success: false,
            error: 'Error de servidor. Inténtalo de nuevo más tarde.'
        }
    }


} 