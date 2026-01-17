import type { Dish } from '@/types'
import { JSX, ReactNode, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { editDish } from '@/actions/restaurant/editDish/editDish'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { Label } from '../ui/label'
import { DollarSign } from 'lucide-react'
import { toast } from "react-hot-toast";

interface EditDishFormProps {
    restaurantId: number;
    dish: Dish
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
            {pending ? <Spinner /> : 'Editar'}
        </Button>
    );
}

export const EditDishForm = ({
    restaurantId,
    dish,
    children,
    onClose
}: EditDishFormProps): JSX.Element => {

    const [state, action] = useFormState(editDish, intialState)
    const { pending } = useFormStatus()

    useEffect(() => {
        if (state.success && !pending) {
            toast.success(`se edito el plato: ${dish.name}`, { duration: 3000 })
            onClose()
        }

        if (state.error && !pending) {
            toast.error(state.error, { duration: 3000 })
        }
    }, [state.success, state.error, pending, dish.name, onClose])

    return (
        <form action={action} className='flex flex-col gap-3'>
            <Input
                type='hidden'
                name='dishId'
                value={dish.id}
            />

            <Input type='hidden' name='restaurantId' value={restaurantId} />

            <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor='dishName' className='pl-1'>Nombre</Label>
                <Input
                    id='dishName'
                    type='text'
                    name='dishName'
                    defaultValue={dish.name}
                />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1 relative">
                <Label htmlFor='dishPrice' className='pl-1'>Precio</Label>
                <DollarSign size={18} className='absolute top-[27px] left-1' />
                <Input
                    id='dishPrice'
                    type='number'
                    name='dishPrice'
                    defaultValue={dish.price}
                    className="no-spinner pl-5"
                    onWheel={(e) => e.currentTarget.blur()}
                />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor='dishDescription' className='pl-1'>Descripción</Label>
                <Textarea
                    id='dishDescription'
                    name='dishDescription'
                    defaultValue={dish.description ?? ''}
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
