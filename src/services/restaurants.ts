import { Prisma, Restaurant } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { captureServiceError } from '@/lib/sentry';

type RestaurantWithRelations = Prisma.RestaurantGetPayload<{
    include: {
        menuCategories: {
            include: {
                dishes: true
            }
        },
        users: true
    }
}>;

export async function getRestaurantData(
    slug: string
): Promise<RestaurantWithRelations | null> {
    if (!slug) return null;

    try {
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
    } catch (error) {
        captureServiceError(error, {
            service: 'getRestaurantData',
            action: 'getRestaurantData',
            page: 'RestaurantPage/slug'
        });
        console.error(`Error fetching restaurant with slug "${slug}":`, error);
        return null;
    }
}

export async function getRestaurantList(): Promise<Restaurant[]> {
    try {
        const restaurantList = await prisma.restaurant.findMany()

        return restaurantList
    } catch (error) {
        captureServiceError(error, {
            service: 'Restaurants',
            action: 'getRestaurantList',
            page: 'AdminIndexPage'
        })

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

export async function getRestaurantDataByUser(
    userId: number
): Promise<RestaurantPayload | null> {

    if (!userId || isNaN(userId)) {
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
        captureServiceError(error, {
            service: 'getRestaurantDataByUser',
            action: 'getRestaurantDataByUser',
            page: 'DashboardPage'
        })
        return null
    }
}