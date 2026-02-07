"use client"
import type { Restaurant } from "@/generated/prisma/client"
import { JSX } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AdminPageProps {
    restaurants: Restaurant[]
}

export const SuperAdminPage = ({ restaurants }: AdminPageProps): JSX.Element => {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'loading') {
        return <div>Cargando...</div>
    }

    const userName = session?.user?.name

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
                {restaurants.map(({ name, image, slug }, i) => (
                    <Link
                        key={name + i}
                        href={`/restaurant/${slug}`}
                        className="group"
                    >
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="relative h-40 w-full">
                                <Image
                                    src={image ?? '/images/no-image-rest.jpg'}
                                    alt={name ? `${name}-image` : 'not-found-image'}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-3">
                                <h5 className="text-base font-semibold text-gray-800 truncate">
                                    {name}
                                </h5>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}