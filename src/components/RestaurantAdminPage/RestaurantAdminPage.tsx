'use client'
import type { RestaurantPayload } from "@/services/restaurants";
import { JSX } from "react";
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { RestaurantAdminCard } from '@/components/RestaurantAdminCard/RestaurantAdminCard'

interface RestaurantAdminPageProps {
    restaurant: RestaurantPayload;
}

export const RestaurantAdminPage = ({ restaurant }: RestaurantAdminPageProps): JSX.Element => {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Cargando sesión...</div>;
    }

    const userName = session?.user?.name;

    return (
        <>
            <h1>Bienvenido al Dashboard, {userName}!</h1>
            <Button onClick={() => signOut({ callbackUrl: '/login' })}>Cerrar Sesión</Button>

            <div className="max-w-3xl mx-auto">
                <RestaurantAdminCard {...restaurant} />
            </div>
        </>
    )
}