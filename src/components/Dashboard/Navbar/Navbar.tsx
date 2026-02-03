'use client'
import type { Session } from "next-auth";
import { useState, useEffect } from "react";
import Link from 'next/link'
import { signOut } from "next-auth/react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ChangePasswordModal } from "@/components/Dashboard";
import { LogOut, Lock, ExternalLink } from 'lucide-react';

interface NavbarProps {
    session: Session | null
    slug: string
}

export const Navbar = ({ session, slug }: NavbarProps) => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const openModalHandler = () => {
        setOpenModal(!openModal)
    }

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [openModal]);

    if (!session) return null

    const { user } = session

    return (
        <>
            {openModal && (
                <ChangePasswordModal
                    onClose={() => setOpenModal(false)}
                    userId={Number(user.id)}
                />
            )}

            <nav className="max-w-3xl mx-auto flex justify-between items-center px-4 my-4">
                <p>Bienvenido: <span className="font-bold">{user.name}</span></p>

                <div className=" flex gap-4">
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href={`/restaurant/${slug}`}>
                                <ExternalLink size={18} className="cursor-pointer" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Ver Menú
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Lock
                                size={18}
                                className="cursor-pointer"
                                onClick={openModalHandler}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            Cambiar Contraseña
                        </TooltipContent>
                    </Tooltip>

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

                </div>
            </nav>
        </>
    )
}