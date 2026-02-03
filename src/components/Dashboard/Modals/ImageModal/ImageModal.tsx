import { JSX } from "react";
import { EditRestaurantImageForm } from "@/components/Dashboard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImageModalProps {
    open: boolean;
    onClose: () => void;
    restaurantId: number;
}

export const ImageModal = ({ onClose, restaurantId }: ImageModalProps): JSX.Element => {

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <Card
                className="w-full max-w-md rounded-2xl shadow-2xl m-3"
                onClick={(e) => e.stopPropagation()}
            >
                <CardHeader className="m-0">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                        Editar Imagen
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                    <EditRestaurantImageForm
                        restaurantId={restaurantId}
                        onClose={onClose}
                    >
                        <CardFooter className="px-1">
                            <Button
                                variant='outline'
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                        </CardFooter>
                    </EditRestaurantImageForm>
                </CardContent>
            </Card>
        </div>
    )
}