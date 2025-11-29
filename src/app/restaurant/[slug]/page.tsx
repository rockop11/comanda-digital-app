import type { Restaurant } from "@/types";
import { notFound } from "next/navigation";
import { getRestaurantData } from "@/lib/getRestaurantData";
import { RestaurantHeader } from "@/components/RestaurantHeader/RestaurantHeader";
import { RestaurantMenu } from "@/components/RestaurantMenu/RestaurantMenu";

export default async function RestaurantPage(
    { params }: {
        params: Promise<{ slug: string }>
    }) {
    const { slug } = await params;

    const restaurant: Restaurant = await getRestaurantData(slug);

    if (!restaurant) return notFound();

    const { name, image, wifi, menu } = restaurant

    return (
        <>
            <RestaurantHeader
                name={name}
                image={image}
                wifi_name={wifi.name}
                wifi_pass={wifi.password}
            />

            <RestaurantMenu menu={menu} />
        </>
    );
}
