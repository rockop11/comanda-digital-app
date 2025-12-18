import { Button } from "../ui/button"
import { deleteMenuCategory } from '@/actions/deleteMenuCategory/deleteMenuCategory'
import { Spinner } from "../ui/spinner";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface DeleteCategoryFormProps {
    categoryId: number;
    restaurantId: number;
    onClose: () => void;
}

const initialState = { success: false, error: null }

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            variant={'destructive'}
            className="w-full cursor-pointer"
            disabled={pending}
        >
            {pending ? <Spinner /> : 'Eliminar'}
        </Button>
    );
};

export const DeleteCategoryForm = ({
    categoryId,
    restaurantId,
    onClose
}: DeleteCategoryFormProps) => {

    const [state, action] = useFormState(deleteMenuCategory, initialState)
    const { pending } = useFormStatus();

    useEffect(() => {
        if (state.success && !pending) {
            toast.success('Se eliminó la categoría', { duration: 3000 });
            onClose();
        }

        if (state.error && !pending) {
            toast.error(state.error, {
                duration: 3000
            })
        }
    }, [state.success, state.error, pending, onClose])

    return (
        <form action={action}>
            <input type="hidden" name="categoryId" value={categoryId} />
            <input type="hidden" name="restaurantId" value={restaurantId} />

            <SubmitButton />
        </form>
    )
}