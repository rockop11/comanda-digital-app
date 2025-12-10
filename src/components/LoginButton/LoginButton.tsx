'use client'
import { JSX } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const LoginButton = (): JSX.Element => {
    const router = useRouter()
    return (
        <Button onClick={() => router.push('/login')}>
            Ir al Login
        </Button>
    )
}