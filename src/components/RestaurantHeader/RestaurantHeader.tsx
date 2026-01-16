'use client'
import type { RestaurantHeaderProps } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { RestaurantEditNameForm } from "@/components/RestaurantEditNameForm/RestaurantEditNameForm";
import { EditWifiNameForm } from "@/components/EditWifiNameForm/EditWifiNameForm";
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
    mode,
    setOpen
}: RestaurantHeaderProps) => {

    const isAdmin = mode === 'ADMIN'

    const [editField, setEditField] = useState<EditFieldProps>({
        field: null,
        edit: false
    })

    const handleCopy = async () => {

        if (!wifi_pass) {
            toast.error('No hay contraseña para copiar', {
                duration: 3000
            })

            return
        }

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

            <div className="shrink-0 relative">
                {isAdmin && setOpen && (
                    <div className="absolute flex justify-center items-center top-2 right-2 rounded-full bg-white h-6 w-6">
                        <Tooltip>
                            <TooltipTrigger>
                                <Pen
                                    size={14}
                                    className="cursor-pointer"
                                    onClick={() => setOpen(true)}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                Editar imagen
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )}
                <Image
                    src={image ?? '/images/no-image-rest.jpg'}
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
                                        <Pen size={16} className="cursor-pointer" onClick={() => editFieldHandler('NAME')} />
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
                            {editField.edit && editField.field === 'WIFI_NAME' && restaurantId
                                ? (<>
                                    <EditWifiNameForm
                                        restaurantId={restaurantId}
                                        editFieldHandler={editFieldHandler}
                                    />
                                </>)
                                : (<>
                                    <Wifi className="w-4 h-4" />
                                    {wifi_name ? (<span className="font-normal">{wifi_name}</span>) : ('-')}
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Pen size={16} className="cursor-pointer" onClick={() => editFieldHandler('WIFI_NAME')} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Editar Red Wifi
                                        </TooltipContent>
                                    </Tooltip>
                                    {/* <div><Pen size={16} className="cursor-pointer" onClick={() => editFieldHandler('WIFI_NAME')} /></div> */}
                                </>)}

                        </>)
                        : (<>
                            <Wifi className="w-4 h-4" />
                            {wifi_name ? (<span className="font-normal">{wifi_name}</span>) : ('-')}
                        </>)
                    }
                </div>

                <div className="flex items-center gap-2 text-sm md:text-base">
                    {isAdmin
                        ? (<>
                            <Lock className="w-4 h-4" />
                            {wifi_pass ? (<span className="font-normal">{wifi_pass}</span>) : ('-')}
                            <div><Pen size={16} /></div>
                        </>)
                        : (<>
                            <Lock className="w-4 h-4" />
                            {wifi_pass ? (<span className="font-normal">{wifi_pass}</span>) : ('-')}
                            <button className="p-1 hover:opacity-70" onClick={handleCopy} disabled={!wifi_pass}>
                                <Copy className="w-4 h-4" />
                            </button>
                        </>)
                    }
                </div>
            </div>
        </div>
    )
}
