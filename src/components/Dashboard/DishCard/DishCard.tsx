import type { Dish } from "@/types"
import { JSX } from "react"
import Image from "next/image"
import { Badge } from "../../ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"
import { Switch } from "../../ui/switch"
import { Pen, Trash2 } from "lucide-react"

interface DishCardProps {
    dish: Dish
    isAdmin: boolean;
    loadingDishId: number | null;
    handleToggleActiveDish: (dishId: number, isActive: boolean) => void;
    openEditDishModal: (dish: Dish) => void;
    openDeleteModalHandler: (dish: Dish) => void;
}

export const DishCard = ({
    dish,
    isAdmin,
    loadingDishId,
    handleToggleActiveDish,
    openEditDishModal,
    openDeleteModalHandler
}: DishCardProps): JSX.Element => {
    return (
        <div
            key={dish.id}
            className={`
                flex gap-3 p-3 rounded-lg shadow-sm border transition-all relative
                ${dish.isActive
                    ? 'bg-white border-gray-100 hover:shadow-md'
                    : `
                      bg-gray-50 border-gray-200
                        [&>*:not(.interactive)]:opacity-50
                        [&>*:not(.interactive)]:grayscale
                        [&>*:not(.interactive)]:pointer-events-none
                    `
                }
            `}
        >
            {!dish.image ? (
                <div className="relative w-20 h-20 md:w-40 md:h-40 rounded-md overflow-hidden ring-1 ring-black/10 shrink-0">
                    <Image
                        src="/images/no-image-rest.jpg"
                        alt="Imagen no disponible"
                        fill
                        sizes="(max-width: 768px) 80px, 160px"
                        className="object-cover"
                        loading="lazy"
                    />
                </div>
            ) : (
                <div className="relative w-20 h-20 md:w-40 md:h-40 rounded-md overflow-hidden ring-1 ring-black/10 shrink-0">
                    <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 768px) 80px, 160px"
                        className="object-cover"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="flex flex-col flex-1 min-w-0 justify-between">
                <div>
                    <h3 className="font-semibold text-sm md:text-lg leading-tight line-clamp-1 md:line-clamp-2 pr-16 md:pr-24">
                        {dish.name}
                    </h3>

                    <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-2 line-clamp-1 md:line-clamp-2">
                        {dish.description}
                    </p>

                    <div className="flex items-center gap-2 mt-1 md:hidden">
                        <span className="font-bold text-base text-gray-900">
                            ${dish.price.toFixed(2)}
                        </span>
                    </div>
                </div>

                <div className='flex flex-wrap gap-1 mt-1 md:mt-2'>
                    {dish.isVegan && <Badge className="text-xs py-0 px-2 md:text-sm">🌱 Vegano</Badge>}
                    {dish.isVegetarian && <Badge className="text-xs py-0 px-2 md:text-sm">🥬 Vegetariano</Badge>}
                    {dish.isGlutenFree && <Badge className="text-xs py-0 px-2 md:text-sm">Sin TACC</Badge>}
                    {dish.isSpicy && <Badge className="text-xs py-0 px-2 md:text-sm">🌶️ Picante</Badge>}
                    {dish.isDairyFree && <Badge className="text-xs py-0 px-2 md:text-sm hidden md:inline-flex">Sin lactosa</Badge>}
                </div>

                <div className="hidden md:flex justify-end mt-3 pt-2 border-t">
                    <span className="font-semibold text-base text-gray-700">
                        ${dish.price.toFixed(2)}
                    </span>
                </div>
            </div>

            {isAdmin && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-1 md:gap-2 interactive pointer-events-auto z-10">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="p-1">
                                <Switch
                                    className="scale-90 md:scale-100"
                                    checked={dish.isActive}
                                    onCheckedChange={() => handleToggleActiveDish(dish.id, dish.isActive)}
                                    disabled={loadingDishId === dish.id}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            {dish.isActive ? 'Desactivar' : 'Activar'}
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                                <Pen
                                    size={18}
                                    className='cursor-pointer'
                                    onClick={() => openEditDishModal({ ...dish })}
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>Editar</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="p-1.5 hover:bg-red-50 rounded transition-colors">
                                <Trash2
                                    size={18}
                                    className='cursor-pointer'
                                    color='red'
                                    onClick={() => openDeleteModalHandler(dish)}
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>Eliminar</TooltipContent>
                    </Tooltip>
                </div>
            )}
        </div>
    )
}