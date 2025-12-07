"use client"
import { JSX } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "../ui/button"

export const AdminPage = (): JSX.Element => {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <div>Cargando...</div>
    }

    const userName = session?.user?.name


    return (
        <>
            <h2>Biendvenido {userName}</h2>

            <Button onClick={() => signOut({
                callbackUrl: '/login'
            })}>
                Salir
            </Button>
        </>
    )
}