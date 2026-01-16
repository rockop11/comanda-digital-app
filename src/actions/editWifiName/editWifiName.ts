'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type EditWifiNameProps = {
    success: boolean,
    error: string | null
}

export async function editWifiName(
    prevState: EditWifiNameProps,
    formData: FormData
): Promise<EditWifiNameProps> {

    const restaurantId = formData.get('restaurantId');
    const wifiName = formData.get('wifiName') as string;

    if (!restaurantId || !wifiName) {
        return {
            success: false,
            error: 'Faltan datos obligatorios'
        }
    }

    try {
        await prisma.restaurant.update({
            where: { id: Number(restaurantId) },
            data: { wifiName: wifiName }
        })

        revalidatePath('/dashboard')

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