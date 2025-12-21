'use client'
import type { RestaurantHeaderProps } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { RestaurantEditNameForm } from "../RestaurantEditNameForm/RestaurantEditNameForm";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Copy, Wifi, Lock, Pen } from "lucide-react"
import { toast } from 'react-hot-toast'

type FieldProps = 'NAME' | 'WIFI_NAME' | 'WIFI_PASS' | null

interface EditFieldProps {
    field: FieldProps;
    edit: boolean;
}

export const RestaurantHeader = ({
    restaurantId,
    image,
    name,
    wifi_name,
    wifi_pass,
    mode
}: RestaurantHeaderProps) => {

    const isPublic = mode === 'PUBLIC'
    const isAdmin = mode === 'ADMIN'

    const [editField, setEditField] = useState<EditFieldProps>({
        field: null,
        edit: false
    })

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(wifi_pass);
            toast.success('se copió la contraseña')
        } catch (e) {
            toast.error('No se pudo copiar la contraseña')
        }
    };

    const editFieldHandler = (field: FieldProps) => {
        setEditField({
            field: field,
            edit: true
        })
    }

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
                        {editField.edit && editField.field === 'NAME' && restaurantId
                            ? (<>
                                <RestaurantEditNameForm
                                    restaurantId={restaurantId}
                                    restaurantName={name}
                                    editFieldHandler={editFieldHandler}
                                />
                            </>)
                            : (<>
                                <h2 className="text-xl font-bold md:text-2xl">{name}</h2>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Pen size={18} className="cursor-pointer" onClick={() => editFieldHandler('NAME')} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Editar nombre
                                    </TooltipContent>
                                </Tooltip>
                            </>)}

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
