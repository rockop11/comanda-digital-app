'use client'

import type {
    ActionTypeModalProps,
    Dish,
    MenuCategory,
    SetCategorySelectedProps
} from '@/types/index';
import { JSX, useEffect, useState } from 'react';
import { DeleteDishModal, EditDishModal, DishCard } from '@/components/Dashboard';
import { toggleActivationDish } from '@/actions/restaurant/toggleActivationDish/toggleActivationDish';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Trash2, Pen, Plus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { toast } from 'react-hot-toast'

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
            // Bloquear scroll del body
            document.body.style.overflow = 'hidden';
            // Prevenir scroll en iOS Safari
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            // Restaurar scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isEditDishModalOpen, isDeleteDishModalOpen]);


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
                                <div className="flex flex-col gap-3 mt-4">
                                    {dishes.map(({ ...dish }) => (
                                        <DishCard
                                            key={dish.id}
                                            dish={dish}
                                            isAdmin={isAdmin}
                                            loadingDishId={loadingDishId}
                                            handleToggleActiveDish={handleToggleActiveDish}
                                            openEditDishModal={openEditDishModal}
                                            openDeleteModalHandler={openDeleteModalHandler}

                                        />
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