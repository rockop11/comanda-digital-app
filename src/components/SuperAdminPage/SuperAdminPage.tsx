"use client"
import type { Restaurant } from "@/generated/prisma/client"
import { JSX } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
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
            <h2>Bienvenido {userName}</h2>

            <Button onClick={() => router.push('/admin/restaurant/create')}>
                Crear Restaurante
            </Button>

            <Button onClick={() => signOut({
                callbackUrl: '/login'
            })}>
                Salir
            </Button>


            <div className="flex align-center gap-4 m-4">
                {restaurants.map(({ name, image }, i) => (
                    <div
                        key={name + i}
                        className="border border-grey-500 w-fit"
                    >
                        <h5>{name}</h5>

                        <Image
                            src={image}
                            alt={`${name}-image`}
                            width={100}
                            height={100}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}