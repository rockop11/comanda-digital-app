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