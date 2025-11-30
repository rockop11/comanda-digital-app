import type { Restaurant } from "@/types";
import { notFound } from "next/navigation";
import { getRestaurantData } from "@/lib/getRestaurantData";
import { RestaurantHeader } from "@/components/RestaurantHeader/RestaurantHeader";
import { RestaurantMenu } from "@/components/RestaurantMenu/RestaurantMenu";

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    const restaurant: Restaurant = await getRestaurantData(slug);

    if (!restaurant) return {};

    const { name } = restaurant;

    return {
        title: `${name}`,
        description: `Menu and details for ${slug}`
    }
}

export default async function RestaurantPage(
    { params }: {
        params: Promise<{ slug: string }>
    }) {
    const { slug } = await params;

    const restaurant: Restaurant = await getRestaurantData(slug);

    if (!restaurant) return notFound();

    const { name, image, wifi, menu } = restaurant

    return (
        <div className='max-w-3xl mx-auto'>
            <RestaurantHeader
                name={name}
                image={image}
                wifi_name={wifi.name}
                wifi_pass={wifi.password}
            />

            <RestaurantMenu menu={menu} />
        </div>
    );
}
