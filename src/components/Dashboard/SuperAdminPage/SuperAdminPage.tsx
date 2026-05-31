"use client"
import type { Restaurant } from "@/generated/prisma/client"
import { JSX, useState } from "react"
import { toggleActivationRestaurant } from "@/actions/admin/toggleActivationRestaurant/toggleActivationRestaurant"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { toast } from 'react-hot-toast'
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { captureServiceError } from "@/lib/sentry"

interface AdminPageProps {
    restaurants: Restaurant[]
}

export const SuperAdminPage = ({ restaurants }: AdminPageProps): JSX.Element => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [loadingIds, setLoadingIds] = useState(new Set());

    const userName = session?.user?.name

    const toggleActivationRestaurantHandler = async (
        restaurantId: number,
        currentActive: boolean,
        restaurantName: string
    ) => {
        setLoadingIds(prev => new Set(prev).add(restaurantId));
        const newActiveState = !currentActive
        try {
            const result = await toggleActivationRestaurant(restaurantId, newActiveState)

            if (result.success) {
                toast.success(newActiveState
                    ? `${restaurantName} activado` : `${restaurantName} desactivado`, {
                    duration: 3000
                })
            } else {
                toast.error(newActiveState
                    ? 'Error al desactivar el restaurant' : 'Error al activar el restaurant', {
                    duration: 3000
                })
            }
        } catch (error) {
            captureServiceError(error, {
                service: 'ToggleRestaurantActivation',
                action: 'toggleActivationRestaurant',
                level: 'warning',
                extra: {
                    restaurantId,
                    currentActive,
                    restaurantName
                }
            })
        } finally {
            setLoadingIds(prev => {
                const next = new Set(prev);
                next.delete(restaurantId);
                return next;
            });
        }
    }

    if (status === 'loading') {
        return <div>Cargando...</div>
    }

    return (
        <>
            <div>
                <div className="flex justify-between p-2">
                    <h2>Bienvenido {userName}</h2>

                    <Button onClick={() => signOut({
                        callbackUrl: '/login'
                    })}>
                        Salir
                    </Button>
                </div>

                <Button className="mx-4" onClick={() => router.push('/admin/restaurant/create')}>
                    Crear Restaurante
                </Button>
            </div>

            <div className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {restaurants.map(({ name, image, slug, isActive, id }) => (
                    <div key={id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <Link
                            href={`/restaurant/${slug}`}
                            className="group"
                        >

                            <div className="relative h-40 w-full overflow-hidden">
                                <Image
                                    src={image ?? '/images/no-image-rest.jpg'}
                                    alt={name ? `${name}-image` : 'not-found-image'}
                                    fill
                                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </Link>

                        <div className="flex justify-between p-3">
                            <h5 className="text-base font-semibold text-gray-800 truncate">
                                {name}
                            </h5>

                            <div className="flex gap-4 items-center">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div
                                            className={`
                                                w-4 h-4 rounded-full
                                                animate-pulse
                                                ${isActive
                                                    ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]'
                                                    : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]'}
                                            `}
                                        />
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        {isActive ? 'Activo' : 'Desactivado'}
                                    </TooltipContent>
                                </Tooltip>


                                <Switch
                                    className="scale-90 md:scale-100 cursor-pointer"
                                    checked={isActive}
                                    onCheckedChange={() => toggleActivationRestaurantHandler(id, isActive, name)}
                                    disabled={loadingIds.has(id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}