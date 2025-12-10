import { Restaurant } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export async function getRestaurantData(slug: string) {
    if (!slug) return null;

    const restaurant = await prisma.restaurant.findUnique({
        where: { slug },
        include: {
            wifi: true,
            menuCategories: {
                orderBy: { id: 'asc' },
                include: { dishes: { orderBy: { name: 'asc' } } }
            },
            users: true,
        }
    })

    return restaurant;
}

export async function getRestaurantList(): Promise<Restaurant[]> {
    try {
        const restaurantList = await prisma.restaurant.findMany()

        return restaurantList
    } catch (error) {
        console.log({ error })

        return []
    }
}