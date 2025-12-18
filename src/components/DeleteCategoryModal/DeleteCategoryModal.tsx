'use client'
import { JSX } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { DeleteCategoryForm } from "../DeleteCategoryForm/DeleteCategoryForm";
import { Button } from "@/components/ui/button";

type DeleteCategoryModalProps = {
    open: boolean;
    categoryId: number;
    restaurantId: number;
    categoryName: string;
    dishesCount: number;
    onClose: () => void;
};

export const DeleteCategoryModal = ({
    open,
    categoryId,
    restaurantId,
    dishesCount,
    categoryName,
    onClose,
}: DeleteCategoryModalProps): JSX.Element | null => {

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <Card
                className="w-full max-w-md rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                        Eliminar categoría
                    </CardTitle>
                    <p className="text-sm text-gray-500 font-bold">
                        {categoryName}
                    </p>
                </CardHeader>

                <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Esta categoría contiene{" "}
                        <span className="font-semibold text-gray-900">
                            {dishesCount}
                        </span>{" "}
                        {dishesCount === 1 ? "plato" : "platos"} que también serán eliminados.
                    </p>

                    <p className="text-sm text-gray-700">
                        ¿Deseás continuar?
                    </p>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" className="cursor-pointer" onClick={onClose}>
                        Cancelar
                    </Button>

                    <DeleteCategoryForm
                        categoryId={categoryId}
                        restaurantId={restaurantId}
                        onClose={onClose}
                    />
                </CardFooter>
            </Card>
        </div>
    );
};
