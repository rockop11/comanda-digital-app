"use server";

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@/generated/prisma/enums';
import { Prisma } from '@/generated/prisma/client';
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache';
import { captureException } from '@sentry/nextjs';

interface FormState {
    error?: string;
    success?: boolean;
}

const getBlobToken = () => {
    if (process.env.NODE_ENV === 'development') {
        return process.env.BLOB_READ_WRITE_TOKEN_DEV_READ_WRITE_TOKEN;
    }

    return process.env.BLOB_READ_WRITE_TOKEN;
}

export async function createRestaurantAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {

    const blobToken = getBlobToken();

    if (!blobToken) {
        return { error: "Error de configuración: Falta el token de Blob para este entorno.", success: false };
    }

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const file = formData.get('image') as File;

    const wifiName = formData.get('wifiName') as string || null
    const wifiPassword = formData.get('wifiPassword') as string || null

    const adminName = formData.get('adminName') as string;
    const adminEmail = formData.get('adminEmail') as string;
    const adminPassword = formData.get('adminPassword') as string;

    if (!name || !slug || !adminEmail || !adminPassword || !wifiPassword) {
        return { error: "Debe completar todos los campos obligatorios." };
    }

    try {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const newRestaurant = await prisma.restaurant.create({
            data: {
                slug: slug,
                name: name,
                wifiName: wifiName,
                wifiPass: wifiPassword,

                users: {
                    create: {
                        name: adminName,
                        email: adminEmail,
                        password: hashedPassword,
                        role: Role.RESTAURANT_ADMIN,
                    }
                },
            },
        });

        if (file && file.size > 0) {
            const blobPath = `restaurants/${newRestaurant.id}/logo-${Date.now()}.${file.name.split('.').pop()}`;

            const { url: publicImageUrl } = await put(blobPath, file, {
                access: 'public',
                contentType: file.type,
                token: blobToken
            });

            await prisma.restaurant.update({
                where: { id: newRestaurant.id },
                data: { image: publicImageUrl }
            })
        }

        revalidatePath('/admin');

        return {
            success: true
        }

    } catch (error) {
        console.error("Error al crear restaurante:", error);

        captureException(error, {
            tags: {
                section: 'createRestaurantAction',
                action: 'createRestaurant'
            },
            extra: {
                categoryId: formData.get('categoryId'),
                restaurantId: formData.get('restaurantId'),
                timestamp: new Date().toISOString()}
        })

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const target = (error.meta?.target as string[])?.join(', ') || 'Campo';
                return { error: `Error: El ${target} ya está en uso (Slug o Email).` };
            }
        }

        return { error: "Fallo inesperado al crear el restaurante. Intente de nuevo." };
    }
}