'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import { RestaurantPayload } from "@/services/restaurants"
import { CreateRestaurantCategory } from "../CreateRestaurantCategory/CreateRestaurantCategory"
import { Wifi, Lock, Trash2, Pen } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Button } from "../ui/button"
import { CategoryModal } from "../CategoryModal/CategoryModal"

type ActionTypeModalProps = 'EDIT' | 'DELETE' | null

export const RestaurantAdminCard = ({ name, image, menuCategories, wifi, id }: RestaurantPayload) => {

    const [showAddNewCategory, setShowAddNewCategory] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [actionModalType, setActionModalType] = useState<ActionTypeModalProps>(null)
    const [categorySelected, setCategorySelected] = useState<{
        id: number;
        name: string;
        dishesCount?: number;
    } | null>(null);

    const showAddNewCategoryHandler = () => {
        setShowAddNewCategory(prevState => !prevState)
    }

    const closeModalHandler = () => {
        setOpen(false)
        setCategorySelected(null)
    }

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            {open && actionModalType && categorySelected && (
                <CategoryModal
                    open
                    categoryId={categorySelected.id}
                    restaurantId={id}
                    categoryName={categorySelected.name}
                    dishesCount={categorySelected?.dishesCount || 0}
                    actionType={actionModalType}
                    onClose={closeModalHandler}
                />
            )}

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm w-full">
                <div className="shrink-0">
                    <Image
                        alt={`${name}-logo`}
                        src={image}
                        height={100}
                        width={100}
                        className="rounded-sm object-cover md:w-[150px] md:h-[150px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold md:text-2xl">{name}</h2>

                    <div className="flex items-center gap-2 text-sm md:text-base">
                        <Wifi className="w-4 h-4" />
                        <span className="font-normal">{wifi.name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm md:text-base">
                        <Lock className="w-4 h-4" />
                        <span className="font-normal">{wifi.password}</span>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <Button
                    className="cursor-pointer"
                    onClick={showAddNewCategoryHandler}>
                    {showAddNewCategory ? 'Ocultar' : 'Crear Categoria'}

                </Button>

                {showAddNewCategory && (
                    <CreateRestaurantCategory restaurantId={id} />
                )}

                {menuCategories.map(({ category, dishes, id }, i) => (
                    <Accordion
                        key={category + i}
                        type="multiple"
                    >
                        <AccordionItem value={`item-${i}`}>
                            <AccordionTrigger className="w-full px-0">
                                <div className="flex w-full items-center justify-between">
                                    <span className="text-2xl font-semibold">
                                        {category}
                                    </span>

                                    <div className="flex items-center">
                                        <div
                                            className="cursor-pointer"
                                            role='button'
                                            tabIndex={0}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setOpen(true)
                                                setActionModalType('EDIT')
                                                setCategorySelected({
                                                    id,
                                                    name: category,
                                                })
                                            }}
                                        >
                                            <Pen size={18} />
                                        </div>

                                        <div
                                            role="button"
                                            tabIndex={0}
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
                                            className="ml-4 cursor-pointer text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={18} />

                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="flex flex-col gap-4 mt-4">

                                    {dishes.map(({ name, description, id, price, image }) => (
                                        <div
                                            key={id}
                                            className="flex gap-4 p-4 rounded-xl shadow-sm bg-white border border-gray-100 hover:shadow-md transition-shadow"
                                        >
                                            {!image
                                                ? (<Image
                                                    src='/images/image-not-found.jpeg'
                                                    alt='Imagen no disponible'
                                                    width={120}
                                                    height={120}
                                                    className="rounded-lg object-cover w-[120px] h-[120px]"
                                                    loading='eager'
                                                />)
                                                : (
                                                    <Image
                                                        src={image}
                                                        alt={name}
                                                        width={120}
                                                        height={120}
                                                        className="rounded-lg object-cover w-[120px] h-[120px]"
                                                    />)}

                                            <div className="flex flex-col flex-1 justify-between">
                                                {/* Info superior */}
                                                <div>
                                                    <h3 className="font-semibold text-lg leading-tight">
                                                        {name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                                        {description}
                                                    </p>
                                                </div>

                                                {/* Precio abajo a la derecha */}
                                                <div className="flex justify-end mt-2">
                                                    <span className="font-semibold text-gray-700 text-base">
                                                        ${price.toFixed(2)}
                                                    </span>
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

        </>
    )
}
