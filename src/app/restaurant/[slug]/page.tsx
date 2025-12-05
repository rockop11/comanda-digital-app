import type { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { getRestaurantData } from "@/services/restaurants";
import { RestaurantHeader } from "@/components/RestaurantHeader/RestaurantHeader";
import { RestaurantMenu } from "@/components/RestaurantMenu/RestaurantMenu";
import { prisma } from "@/lib/prisma";

export const dynamicParams = true;
interface RestaurantPageProps {
    params: {
        slug: string;
    }
}

export async function generateStaticParams() {
    const restaurants = await prisma.restaurant.findMany({
        select: {
            slug: true,
        },
    });

    return restaurants.map((restaurant) => ({
        slug: restaurant.slug,
    }));
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {

    const resolvedParams = await params;

    const slug = resolvedParams.slug;

    if (!slug || Array.isArray(slug)) {
        return { title: 'Restaurante Digital' };
    }

    const restaurant = await getRestaurantData(slug);

    if (!restaurant) {
        return { title: 'Restaurante No Encontrado' };
    }

    return {
        title: `${restaurant.name}`,
        description: `Menú de ${restaurant.name}.`,
    };
}

export default async function RestaurantPage(
    { params }: {
        params: Promise<{ slug: string }>
    }) {
    const { slug } = await params;

    const restaurant = await getRestaurantData(slug);

    if (!restaurant) {
        notFound();
    }

    const { name, image, wifi, menuCategories } = restaurant

    return (
        <div className='max-w-3xl mx-auto'>
            <RestaurantHeader
                name={name}
                image={image}
                wifi_name={wifi.name}
                wifi_pass={wifi.password}
            />

            <RestaurantMenu menu={menuCategories} />
        </div>
    );
}