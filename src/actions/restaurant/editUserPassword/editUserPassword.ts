'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { captureServiceError } from "@/lib/sentry";

export type EditUserPasswordProps = {
    success: boolean;
    error: string | null;
}

export async function editUserPassword(
    prevState: EditUserPasswordProps,
    formData: FormData
): Promise<EditUserPasswordProps> {

    const userId = formData.get('userId')
    const currentPassword = formData.get('currentPass') as string
    const newPassword = formData.get('newPass') as string
    const repeatPass = formData.get('repeatNewPass') as string

    if (!userId || !currentPassword || !newPassword || !repeatPass) {
        return {
            success: false,
            error: 'Completa los campos requeridos*'
        }
    }

    if (newPassword !== repeatPass) {
        return {
            success: false,
            error: 'Las contraseñas no coinciden*'
        }
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }
        })

        if (!user) {
            return {
                success: false,
                error: 'Error al actualizar la contraseña*'
            }
        }

        const matchCurrentPass =
            await bcrypt.compare(currentPassword, user.password)

        if (!matchCurrentPass) {
            return {
                success: false,
                error: 'La contraseña actual es incorrecta*'
            }
        }

        const hashedPass = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                password: hashedPass
            }
        })

        revalidatePath('/dashboard')

        return {
            success: true,
            error: null
        }
    } catch (error) {
        captureServiceError(error, {
            level: 'error',
            service: 'EditUserPassword',
            action: 'EditUserPasswordAction',
            extra: {
                userId
            }
        })
        return {
            success: false,
            error: 'Error del servidor, intenta nuevamente más tarde*'
        }
    }
}