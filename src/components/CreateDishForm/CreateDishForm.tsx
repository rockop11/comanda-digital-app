import { JSX, ReactNode, useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom";
import { createDish } from "@/actions/restaurant/createDish/createDish";
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { DollarSign } from "lucide-react";
import { toast } from "react-hot-toast";

interface CreateDishFormProps {
    categoryId: number;
    restaurantId: number;
    children: ReactNode;
    onClose: () => void;
}

const intialState = { success: false, error: null }

const SubmitButton = (): JSX.Element => {
    const { pending } = useFormStatus()
    return (
        <Button
            type="submit"
            className=" cursor-pointer bg-sky-800 color-white"
            disabled={pending}
        >
            {pending ? <Spinner /> : 'Crear'}
        </Button>
    );
}

export const CreateDishForm = ({ restaurantId, categoryId, children, onClose }: CreateDishFormProps): JSX.Element => {

    const [state, action] = useFormState(createDish, intialState)
    const { pending } = useFormStatus()

    useEffect(() => {
        if (state.success && !pending) {
            toast.success(`se creó el plato`, { duration: 3000 })
            onClose()
        }

        if (state.error && !pending) {
            toast.error(state.error, { duration: 3000 })
        }
    }, [state.success, state.error, pending, onClose])


    return (
        <form action={action} className='flex flex-col gap-3'>
            <Input type='hidden' name='restaurantId' value={restaurantId} />
            <Input type='hidden' name='categoryId' value={categoryId} />
            <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor='dishName' className='pl-1'>Título</Label>
                <Input type='text' name='dishTitle' placeholder='Nombre del Plato' required />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1 relative">
                <Label htmlFor='dishPrice' className='pl-1'>Precio</Label>
                <DollarSign size={18} className='absolute top-[27px] left-1' />
                <Input
                    id='dishPrice'
                    type='number'
                    name='dishPrice'
                    className="no-spinner pl-5"
                    onWheel={(e) => e.currentTarget.blur()}
                />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor='dishDescription' className='pl-1'>Descripción</Label>
                <Textarea
                    id='dishDescription'
                    name='dishDescription'
                />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor='dishImage' className='pl-1'>Imagen</Label>
                <Input
                    id='dishImage'
                    type='file'
                    name='dishImage'
                />
            </div>

            <div className="flex flex-col gap-2">
                <h6>Propiedades del plato</h6>
                <div className="flex items-center gap-3">
                    <Checkbox id="isVeggie" name='isVeggie' />
                    <Label htmlFor="isVeggie">Vegetariano</Label>
                </div>

                <div className="flex items-center gap-3">
                    <Checkbox id="isVegan" name='isVegan' />
                    <Label htmlFor="isVegan">Vegano</Label>
                </div>

                <div className="flex items-center gap-3">
                    <Checkbox id="isDairyFree" name='isDairyFree' />
                    <Label htmlFor="isDairyFree">Sin Lactosa</Label>
                </div>

                <div className="flex items-center gap-3">
                    <Checkbox id="isSpicy" name='isSpicy' />
                    <Label htmlFor="isSpicy">Picante</Label>
                </div>

                <div className="flex items-center gap-3">
                    <Checkbox id="isGlutenFree" name='isGlutenFree' />
                    <Label htmlFor="isGlutenFree">Sin TACC</Label>
                </div>
            </div>


            <div>
                {state.error && (
                    <p className="text-center text-sm text-red-600">{state.error}</p>
                )}
            </div>

            <div className="flex justify-end gap-1 pt-2 px-0">
                <div>{children}</div>
                <SubmitButton />
            </div>
        </form>
    )
}
