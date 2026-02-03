import type { Dish } from "@/types";
import { JSX } from "react"
import Image from "next/image";
import { DeleteDishForm } from "@/components/Dashboard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DeleteDishModal {
    dish: Dish
    onClose: () => void;
}

export const DeleteDishModal = ({
    dish,
    onClose
}: DeleteDishModal): JSX.Element => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <Card
                className="w-full max-w-md rounded-2xl shadow-2xl m-3"
            >
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                        Eliminar Plato
                    </CardTitle>
                    <p className="text-md text-gray-400 font-bold">
                        {dish.name}
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Imagen */}
                    <div className="flex justify-center">
                        <Image
                            alt={`${dish.name}-image`}
                            src={dish.image || '/images/no-image-rest.jpg'}
                            width={250}
                            height={250}
                            className="rounded-lg object-cover shadow-md"
                        />
                    </div>

                    {/* Precio */}
                    <div className="flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-500">
                            ${dish.price.toFixed(2)}
                        </span>
                    </div>

                    {/* Descripción */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-32 overflow-y-auto">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {dish.description || 'Sin descripción'}
                        </p>
                    </div>

                    <DeleteDishForm
                        dishId={dish.id}
                        onClose={onClose}
                    >
                        <CardFooter className="px-0">
                            <Button variant="outline" className="cursor-pointer" onClick={onClose}>
                                Cancelar
                            </Button>
                        </CardFooter>
                    </DeleteDishForm>
                </CardContent>
            </Card>
        </div>
    )
}
