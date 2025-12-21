import { JSX, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Check, X } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { editRestaurantName } from "@/actions/editRestaurantName/EditRestaurantName";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-hot-toast";
import { Spinner } from "../ui/spinner";

type FieldProps = 'NAME' | 'WIFI_NAME' | 'WIFI_PASS' | null

const initialState = {
    success: false,
    error: null
}

interface RestaurantEditFormProps {
    restaurantName: string;
    restaurantId: number;
    editFieldHandler: (field: FieldProps, edit: boolean) => void;
}

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <button
            type='submit'
            disabled={pending}
            className="bg-transparent hover:bg-transparent cursor-pointer mt-1.5"
        >
            {pending ? <Spinner /> : <Check size={24} color='green' />}
        </button>
    )
}

export const RestaurantEditNameForm = ({
    restaurantName,
    restaurantId,
    editFieldHandler
}: RestaurantEditFormProps): JSX.Element => {

    const [newRestaurantName, setNewRestaurantName] = useState<string>(restaurantName)

    const [state, action] = useFormState(editRestaurantName, initialState)
    const { pending } = useFormStatus()

    useEffect(() => {
        if (state.success && !pending) {
            toast.success('se actualizó el nombre', {
                duration: 3000
            })
            editFieldHandler(null, false)
        }

        if (state.error && !pending) {
            toast.error('Error al editar el nombre', {
                duration: 3000
            })
        }
    }, [state.success, state.error, pending, editFieldHandler])

    return (
        <form
            action={action}
            className="flex items-center gap-2"
        >
            <Input type='hidden' name='restaurantId' value={restaurantId} />
            <Input
                name='restaurantName'
                defaultValue={newRestaurantName}
                onChange={(e) => setNewRestaurantName(e.target.value)}
            />

            <Tooltip>
                <TooltipTrigger asChild>
                    <span>
                        <SubmitButton />
                    </span>
                </TooltipTrigger>

                <TooltipContent>
                    Guardar
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => editFieldHandler(null, false)}
                        className="bg-transparent hover:bg-transparent cursor-pointer">
                        <X size={24} className="cursor-pointer" color='red' />
                    </button>
                </TooltipTrigger>

                <TooltipContent>
                    Cancelar
                </TooltipContent>
            </Tooltip>
        </form>
    )
}
