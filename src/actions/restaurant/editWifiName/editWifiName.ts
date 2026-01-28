'use server'

import { prisma } from "@/lib/prisma";
import { captureServiceError } from "@/lib/sentry";
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
        captureServiceError(error, {
            level: 'error',
            service: 'EditWifiName',
            action: 'EditWifiNameAction',
            extra: {
                restaurantId,
                wifiName
            }
        })
        return {
            success: false,
            error: 'Error de servidor'
        }
    }
}