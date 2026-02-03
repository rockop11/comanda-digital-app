import { JSX } from "react"
import { EditRestaurantUserPasswordForm } from "@/components/Dashboard";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChangePasswordModalProps {
    userId: number;
    onClose: () => void;
}

export const ChangePasswordModal = ({
    onClose,
    userId
}: ChangePasswordModalProps): JSX.Element => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <Card
                className="w-full max-w-md rounded-2xl shadow-2xl m-3"
            >
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                        Cambiar Contraseña
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <EditRestaurantUserPasswordForm
                        userId={userId}
                        onClose={onClose}
                    >
                        <CardFooter className="px-0">
                            <Button variant='outline' onClick={onClose}>Cancelar</Button>
                        </CardFooter>
                    </EditRestaurantUserPasswordForm>
                </CardContent>


            </Card>
        </div>
    )
}
