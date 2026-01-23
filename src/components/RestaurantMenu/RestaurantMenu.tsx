'use client'

import type {
    ActionTypeModalProps,
    Dish,
    MenuCategory,
    SetCategorySelectedProps
} from '@/types/index';
import { JSX, useEffect, useState } from 'react';
import Image from "next/image";
import { EditDishModal } from '../EditDishModal/EditDishModal';
import { DeleteDishModal } from '../DeleteDishModal/DeleteDishModal';
import { toggleActivationDish } from '@/actions/restaurant/toggleActivationDish/toggleActivationDish';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Trash2, Pen, Plus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Switch } from '../ui/switch';
import { toast } from 'react-hot-toast'
import { Badge } from '../ui/badge';

interface RestaurantMenuProps {
    menu: MenuCategory[];
    mode: 'ADMIN' | 'PUBLIC';
    restaurantId?: number;
    setOpen?: (value: boolean) => void;
    setActionModalType?: (value: ActionTypeModalProps) => void;
    setCategorySelected?: (data: SetCategorySelectedProps | null) => void;
}

export const RestaurantMenu = ({
    restaurantId,
    menu,
    mode,
    setOpen,
    setActionModalType,
    setCategorySelected
}: RestaurantMenuProps): JSX.Element => {

    const isAdmin = mode === 'ADMIN';

    const [isEditDishModalOpen, setIsEditDishModalOpen] = useState<boolean>(false);
    const [isDeleteDishModalOpen, setIsDeleteDishModalOpen] = useState<boolean>(false)
    const [dishToEdit, setDishToEdit] = useState<Dish | null>(null)
    const [dishToDelete, setDishToDelete] = useState<Dish | null>(null)
    const [loadingDishId, setLoadingDishId] = useState<number | null>(null)

    const handleToggleActiveDish = async (dishId: number, currentActive: boolean) => {
        const newActiveState = !currentActive

        setLoadingDishId(dishId)

        const result = await toggleActivationDish(dishId, newActiveState)

        if (result.success) {
            toast.success(newActiveState ? 'Plato activado' : 'Plato desactivado', { duration: 3000 })
        } else {
            toast.error('Error al cambiar estado del plato', { duration: 3000 })
        }

        setLoadingDishId(null)
    }

    const openEditDishModal = (dish: Dish) => {
        setIsEditDishModalOpen(true)
        setDishToEdit(dish)
    }

    const closeEditDishModal = () => {
        setIsEditDishModalOpen(false)
        setDishToEdit(null)
    }

    const openDeleteModalHandler = (dish: Dish) => {
        setIsDeleteDishModalOpen(true)
        setDishToDelete(dish)
    }

    const closeDeleteModalHandler = () => {
        setIsDeleteDishModalOpen(false)
        setDishToDelete(null)
    }

    useEffect(() => {
        if (isEditDishModalOpen || isDeleteDishModalOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isEditDishModalOpen, isDeleteDishModalOpen, menu]);

    return (
        <>
            <div className='p-4'>
                {menu.map(({ category, dishes, id }, i) => (
                    <Accordion
                        key={category + i}
                        type="multiple"
                        defaultValue={menu.map((_, index) => `item-${index}`)}
                    >
                        <AccordionItem value={`item-${i}`}>
                            <AccordionTrigger className="text-2xl font-semibold">
                                {isAdmin && setOpen && setActionModalType && setCategorySelected
                                    ? (<div className="flex w-full items-center justify-between">
                                        <span className="text-2xl font-semibold">
                                            {category}
                                        </span>

                                        <div className="flex items-center gap-4">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        role='button'
                                                        tabIndex={0}
                                                        className="cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpen(true);
                                                            setActionModalType('CREATE');
                                                            setCategorySelected({
                                                                id,
                                                                name: category
                                                            });
                                                        }}
                                                    >
                                                        <Plus size={24} />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Crear plato</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        role='button'
                                                        tabIndex={0}
                                                        className="cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpen(true);
                                                            setActionModalType('EDIT');
                                                            setCategorySelected({
                                                                id,
                                                                name: category
                                                            });
                                                        }}
                                                    >
                                                        <Pen size={18} />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Editar categoría</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        role='button'
                                                        tabIndex={0}
                                                        className="cursor-pointer text-red-500 hover:text-red-700"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpen(true)
                                                            setActionModalType('DELETE')
                                                            setCategorySelected({
                                                                id,
                                                                name: category,
                                                                dishesCount: dishes.length
                                                            })
                                                        }}
                                                    >
                                                        <Trash2 size={18} />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Eliminar categoría</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>)
                                    : (<span>{category}</span>)
                                }
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="flex flex-col gap-4 mt-4">
                                    {dishes.map(({ ...dish }) => (
                                        <div
                                            key={dish.id}
                                            className={`
                                                flex flex-col gap-4
                                                md:flex-row
                                                p-4 rounded-xl shadow-sm border transition-all relative
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
                                            {isAdmin && (
                                                <div className="
                                                    flex gap-2 interactive pointer-events-auto
                                                    self-end
                                                    mb-2
                                                    md:absolute md:top-4 md:right-4 md:z-20
                                                ">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div>
                                                                <Switch
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
                                                            <Pen size={16} className='cursor-pointer' onClick={() => openEditDishModal({ ...dish })} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>Editar plato</TooltipContent>
                                                    </Tooltip>

                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Trash2 size={16} className='cursor-pointer' color='red' onClick={() => openDeleteModalHandler(dish)} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>Eliminar plato</TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            )}

                                            {!dish.image ? (
                                                <div className="relative w-full md:w-40 aspect-square rounded-md overflow-hidden ring-1 ring-black/10">
                                                    <Image
                                                        src="/images/no-image-rest.jpg"
                                                        alt="Imagen no disponible"
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 160px"
                                                        className="object-contain object-center"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="relative w-full md:w-40 aspect-square rounded-md overflow-hidden ring-1 ring-black/10">
                                                    <Image
                                                        src={dish.image}
                                                        alt={dish.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 160px"
                                                        className="object-contain object-center"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}

                                            <div className="flex flex-col flex-1 justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-base sm:text-lg leading-tight line-clamp-2">
                                                        {dish.name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                                        {dish.description}
                                                    </p>
                                                </div>

                                                <div className="flex justify-start md:justify-end mt-3 pt-2 border-t md:border-t-0">
                                                    <span
                                                        className="font-bold text-lg text-gray-900 md:text-base md:text-gray-700"
                                                    >
                                                        ${dish.price.toFixed(2)}
                                                    </span>
                                                </div>

                                                <div className='flex flex-wrap gap-2 mt-2'>
                                                    {dish.isVegan && (
                                                        <Badge>Vegano</Badge>
                                                    )}

                                                    {dish.isVegetarian && (
                                                        <Badge>Vegetariano</Badge>
                                                    )}

                                                    {dish.isDairyFree && (
                                                        <Badge>Sin lactosa</Badge>
                                                    )}

                                                    {dish.isSpicy && (
                                                        <Badge>Picante</Badge>
                                                    )}

                                                    {dish.isGlutenFree && (
                                                        <Badge>Sin TACC</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>

            {isEditDishModalOpen && dishToEdit && restaurantId && isAdmin && (
                <EditDishModal
                    dish={dishToEdit}
                    onClose={closeEditDishModal}
                    restaurantId={restaurantId}
                />
            )}

            {isDeleteDishModalOpen && dishToDelete && restaurantId && isAdmin && (
                <DeleteDishModal
                    dish={dishToDelete}
                    onClose={closeDeleteModalHandler}
                />
            )}
        </>
    )
}


{/* <div
                                            key={dish.id}
                                            className={`
                                                flex gap-4 p-4 rounded-xl shadow-sm border transition-all relative
                                                    ${dish.isActive
                                                    ? 'bg-white border-gray-100 hover:shadow-md'
                                                    : `
                                                    bg-gray-50 border-gray-200
                                                    [&>*:not(.interactive)]:opacity-50
                                                    [&>*:not(.interactive)]:grayscale
                                                    [&>*:not(.interactive)]:pointer-events-none
                                                `}
                                            `}
                                        ></div> */}