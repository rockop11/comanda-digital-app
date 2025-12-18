import { JSX, useEffect, useRef } from 'react'
import { useFormState , useFormStatus} from 'react-dom'
import { createMenuCategoryAction } from '@/actions/createMenuCategory/createMenuCategory'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Spinner } from '../ui/spinner'
import { toast } from 'react-hot-toast'

const initialState = { success: false, error: null }

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? <Spinner /> : 'Crear'}
        </Button>
    );
};

export const CreateRestaurantCategory = (
    { restaurantId }: { restaurantId: number }
): JSX.Element => {

    const formRef = useRef<HTMLFormElement>(null);

    const [state, action] = useFormState(
        createMenuCategoryAction,
        initialState
    )

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
            toast.success('Se creó la Categoria', {
                duration: 3000
            })
        }

        if (state.error) {
            toast.error(state.error, { duration: 3000 })
        }

    }, [state.success, state.error]);


    return (
        <div className="my-2">
            <form action={action} className='flex gap-4' ref={formRef}>
                <Input type='hidden' name='restaurantId' value={restaurantId} />
                <Input
                    placeholder="Ingrese la nueva categoria"
                    name='categoryName'
                    required
                />
                <SubmitButton />
            </form>
        </div>
    )
}