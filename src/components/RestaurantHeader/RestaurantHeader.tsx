'use client'
import Image from "next/image";
import { Copy, Wifi, Lock, Pen } from "lucide-react"
import { toast } from 'react-hot-toast'

interface RestaurantHeaderProps {
    image: string;
    name: string;
    wifi_name: string;
    wifi_pass: string;
    mode: 'PUBLIC' | 'ADMIN'
}

export const RestaurantHeader = ({
    image,
    name,
    wifi_name,
    wifi_pass,
    mode
}: RestaurantHeaderProps) => {

    const isPublic = mode === 'PUBLIC'
    const isAdmin = mode === 'ADMIN'

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(wifi_pass);
            toast.success('se copió la contraseña')
        } catch (e) {
            toast.error('No se pudo copiar la contraseña')
        }
    };

    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm w-full">

            <div className="shrink-0">
                <Image
                    src={image}
                    alt={`${name}-logo`}
                    width={100}
                    height={100}
                    className="rounded-sm object-cover md:w-[150px] md:h-[150px]"
                />
            </div>

            <div className="flex flex-col gap-2">
                {isAdmin
                    ? (<div className="flex gap-4 items-center">
                        <h2 className="text-xl font-bold md:text-2xl">{name}</h2>
                        <Pen size={18} />
                    </div>)
                    : (<h2 className="text-xl font-bold md:text-2xl">{name}</h2>)
                }

                <div className="flex items-center gap-2 text-sm md:text-base">
                    {isAdmin
                        ? (<>
                            <Wifi className="w-4 h-4" />
                            <span className="font-normal">{wifi_name}</span>
                            <div><Pen size={16} /></div>
                        </>)
                        : (<>
                            <Wifi className="w-4 h-4" />
                            <span className="font-normal">{wifi_name}</span>
                        </>)
                    }
                </div>

                <div className="flex items-center gap-2 text-sm md:text-base">
                    {isAdmin
                        ? (<>
                            <Lock className="w-4 h-4" />
                            <span className="font-normal">{wifi_pass}</span>
                            <div><Pen size={16} /></div>
                        </>)
                        : (<>
                            <Lock className="w-4 h-4" />
                            <span className="font-normal">{wifi_pass}</span>
                            {isPublic && (
                                <button className="p-1 hover:opacity-70" onClick={handleCopy}>
                                    <Copy className="w-4 h-4" />
                                </button>
                            )}
                        </>)
                    }

                </div>

            </div>
        </div>
    )
}
