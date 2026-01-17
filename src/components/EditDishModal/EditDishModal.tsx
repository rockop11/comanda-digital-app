import type { Dish } from "@/types";
import { JSX } from "react";
import { EditDishForm } from "../EditDishForm/EditDishForm";
import { Button } from "../ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "../ui/card"

interface EditDishModalProps {
    restaurantId: number;
    dish: Dish
    onClose: () => void;
}

export const EditDishModal = ({ restaurantId, dish, onClose }: EditDishModalProps): JSX.Element => {

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <Card
                className="w-full max-w-md rounded-2xl shadow-2xl m-3"
            >
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                        Editar Plato
                    </CardTitle>
                    <p className="text-md text-sky-700 font-bold">
                        {dish.name}
                    </p>
                </CardHeader>

                <CardContent className="space-y-3">
                    <EditDishForm
                        dish={dish}
                        restaurantId={restaurantId}
                        onClose={onClose}
                    >
                        <CardFooter className="px-0">
                            <Button variant="outline" className="cursor-pointer " onClick={onClose}>
                                Cancelar
                            </Button>
                        </CardFooter>
                    </EditDishForm>
                </CardContent>
            </Card>
        </div>
    )
}