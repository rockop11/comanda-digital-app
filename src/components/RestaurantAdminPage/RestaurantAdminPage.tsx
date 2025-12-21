'use client'
import type { RestaurantPayload } from "@/services/restaurants";
import { JSX } from "react";
import { RestaurantAdminCard } from '@/components/RestaurantAdminCard/RestaurantAdminCard'

interface RestaurantAdminPageProps {
    restaurant: RestaurantPayload;
}

export const RestaurantAdminPage = ({
    restaurant
}: RestaurantAdminPageProps): JSX.Element => {
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <RestaurantAdminCard {...restaurant} />
            </div>
        </>
    )
}