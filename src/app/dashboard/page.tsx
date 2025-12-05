// app/dashboard/page.tsx (o un componente hijo)
'use client';

import { useSession, signOut } from 'next-auth/react';
import { Role } from '@/generated/prisma/client';

export default function DashboardPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Cargando sesión...</div>;
    }

    const userName = session?.user?.name;
    const userRole = session?.user?.role as Role;
    // const userRestaurantId = session?.user?.restaurantId;

    return (
        <div className="p-8">
            <h1>Bienvenido al Dashboard, {userName}!</h1>

            <p>Tu Rol: <strong>{userRole}</strong></p>

            {userRole === 'SUPERADMIN' ? (
                <h1>Buenvenido {userName}</h1>
            ) : (
                <h1>Bienvenido {userName}</h1>
            )}

            <button onClick={() => signOut()}>Cerrar Sesión</button>
        </div>
    );
}