import { Prisma, Restaurant } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export async function getRestaurantData(slug: string) {
    if (!slug) return null;

    const restaurant = await prisma.restaurant.findUnique({
        where: { slug },
        include: {
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

export type RestaurantPayload = Prisma.RestaurantGetPayload<{
    include: {
        menuCategories: {
            include: {
                dishes: true;
            };
        };
    };
}>;

export async function getRestaurantDataByUser(userId: number): Promise<RestaurantPayload | null> {

    if (!userId || isNaN(userId)) {
        console.log('id invalido')
        return null
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                restaurant: {
                    include: {
                        menuCategories: {
                            orderBy: { category: 'asc' },
                            include: {
                                dishes: {
                                    orderBy: { name: 'asc' }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!user || !user.restaurant) {
            return null
        }

        return user.restaurant as RestaurantPayload
    } catch (error) {
        return null
    }
}