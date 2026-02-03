import type { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { getRestaurantData } from "@/services/restaurants";
import { RestaurantHeader, RestaurantMenu } from "@/components/Dashboard";

export const dynamic = 'force-dynamic'
interface RestaurantPageProps {
    params: {
        slug: string;
    }
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

    const { name, image, wifiName, wifiPass, menuCategories } = restaurant

    return (
        <div className='max-w-3xl mx-auto'>
            <RestaurantHeader
                name={name}
                image={image}
                wifi_name={wifiName}
                wifi_pass={wifiPass}
                mode='PUBLIC'
            />

            <RestaurantMenu menu={menuCategories} mode='PUBLIC' />
        </div>
    );
}