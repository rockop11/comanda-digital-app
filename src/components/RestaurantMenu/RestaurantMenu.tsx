import type { MenuCategory } from '@/types/index';
import { JSX } from 'react';
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface RestaurantMenuProps {
    menu: MenuCategory[];
}

export const RestaurantMenu = ({ menu }: RestaurantMenuProps): JSX.Element => {
    return (
        <div className='p-4'>
            {menu.map(({ category, dishes }, i) => (
                <Accordion
                    key={category + i}
                    type="multiple"
                    defaultValue={menu.map((_, index) => `item-${index}`)}
                >
                    <AccordionItem value={`item-${i}`}>
                        <AccordionTrigger className="text-2xl font-semibold">
                            {category}
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
                                            : (
                                                <Image
                                                    src={image}
                                                    alt={name}
                                                    width={120}
                                                    height={120}
                                                    className="rounded-lg object-cover w-[120px] h-[120px]"
                                                />)}
                                        {/* Imagen */}


                                        {/* Info */}
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
    )
}
