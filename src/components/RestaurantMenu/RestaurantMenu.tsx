import type { ActionTypeModalProps, MenuCategory, SetCategorySelectedProps } from '@/types/index';
import { JSX } from 'react';
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Trash2, Pen } from "lucide-react"

interface RestaurantMenuProps {
    menu: MenuCategory[];
    mode: 'ADMIN' | 'PUBLIC';
    setOpen?: (value: boolean) => void;
    setActionModalType?: (value: ActionTypeModalProps) => void;
    setCategorySelected?: (data: SetCategorySelectedProps | null) => void;
}

export const RestaurantMenu = ({
    menu,
    mode,
    setOpen,
    setActionModalType,
    setCategorySelected
}: RestaurantMenuProps): JSX.Element => {

    const isAdmin = mode === 'ADMIN';

    return (
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

                                        <div
                                            role="button"
                                            tabIndex={0}
                                            className="cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpen(true)
                                                setActionModalType('EDIT')
                                                setCategorySelected({
                                                    id,
                                                    name: category
                                                })
                                            }}
                                        >
                                            <Pen size={18} />
                                        </div>

                                        <div
                                            role="button"
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
                                    </div>
                                </div>)
                                : (<span>{category}</span>)
                            }
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className="flex flex-col gap-4 mt-4">
                                {dishes.map(({ name, description, price, image }, index) => (
                                    <div
                                        key={name + index}
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
                                            : (<Image
                                                src={image}
                                                alt={name}
                                                width={120}
                                                height={120}
                                                className="rounded-lg object-cover w-[120px] h-[120px]"
                                            />)}

                                        <div className="flex flex-col flex-1 justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg leading-tight">
                                                    {name}
                                                </h3>

                                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                                    {description}
                                                </p>
                                            </div>

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
    )
}
