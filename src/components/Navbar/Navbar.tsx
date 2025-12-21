'use client'
import type { Session } from "next-auth";
import { signOut } from "next-auth/react"
import { LogOut } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

interface NavbarProps {
    session: Session | null
}

export const Navbar = ({ session }: NavbarProps) => {

    if (!session) return null

    const { user } = session

    return (
        <nav className="max-w-3xl mx-auto flex justify-between items-center my-4">
            <p>Bienvenido: {user.name}</p>
            <Tooltip>
                <TooltipTrigger>
                    <LogOut
                        size={18}
                        className="cursor-pointer"
                        onClick={() => signOut({ callbackUrl: '/login' })}
                    />
                </TooltipTrigger>
                <TooltipContent>
                    Cerrar sesión
                </TooltipContent>
            </Tooltip>
        </nav>
    )
}