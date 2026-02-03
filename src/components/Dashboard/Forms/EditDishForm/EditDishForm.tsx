'use client'
import type { Dish } from '@/types'
import { JSX, ReactNode, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { editDish } from '@/actions/restaurant/editDish/editDish'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
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
                    className="min-h-20 max-h-32 resize-none"
                    rows={3}
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

            <div className="flex flex-col gap-3 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h6 className="text-sm md:text-base font-semibold text-gray-700">Propiedades del plato</h6>

                <div className='flex flex-wrap gap-2 md:gap-3 w-full'>
                    <div className="flex items-center gap-2 p-2 md:p-2.5 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                        <Checkbox
                            id="isVeggie"
                            defaultChecked={dish.isVegetarian ?? false}
                            name='isVeggie'
                            className="w-4 h-4 md:w-5 md:h-5"
                        />
                        <Label htmlFor="isVeggie" className="cursor-pointer text-xs md:text-sm font-medium">
                            Vegetariano
                        </Label>
                    </div>

                    <div className="flex items-center gap-2 p-2 md:p-2.5 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                        <Checkbox
                            id="isVegan"
                            defaultChecked={dish.isVegan ?? false}
                            name='isVegan'
                            className="w-4 h-4 md:w-5 md:h-5"
                        />
                        <Label htmlFor="isVegan" className="cursor-pointer text-xs md:text-sm font-medium">
                            Vegano
                        </Label>
                    </div>

                    <div className="flex items-center gap-2 p-2 md:p-2.5 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                        <Checkbox
                            id="isDairyFree"
                            defaultChecked={dish.isDairyFree ?? false}
                            name='isDairyFree'
                            className="w-4 h-4 md:w-5 md:h-5"
                        />
                        <Label htmlFor="isDairyFree" className="cursor-pointer text-xs md:text-sm font-medium">
                            Sin Lactosa
                        </Label>
                    </div>

                    <div className="flex items-center gap-2 p-2 md:p-2.5 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                        <Checkbox
                            id="isSpicy"
                            defaultChecked={dish.isSpicy ?? false}
                            name='isSpicy'
                            className="w-4 h-4 md:w-5 md:h-5"
                        />
                        <Label htmlFor="isSpicy" className="cursor-pointer text-xs md:text-sm font-medium">
                            Picante
                        </Label>
                    </div>

                    <div className="flex items-center gap-2 p-2 md:p-2.5 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                        <Checkbox
                            id="isGlutenFree"
                            defaultChecked={dish.isGlutenFree ?? false}
                            name='isGlutenFree'
                            className="w-4 h-4 md:w-5 md:h-5"
                        />
                        <Label htmlFor="isGlutenFree" className="cursor-pointer text-xs md:text-sm font-medium">
                            Sin TACC
                        </Label>
                    </div>
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
