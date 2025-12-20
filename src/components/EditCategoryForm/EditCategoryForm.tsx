import { JSX, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { editMenuCategory } from "@/actions/editMenuCategory/editMenuCategory";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from 'react-hot-toast'

interface EditCategoryFormProps {
    children: React.ReactNode
    categoryName: string;
    categoryId: number;
    restaurantId: number
    onClose: () => void;
}

const initialState = { success: false, error: null }

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

export const EditCategoryForm = ({
    categoryName,
    categoryId,
    restaurantId,
    children,
    onClose
}: EditCategoryFormProps): JSX.Element => {

    const [state, action] = useFormState(editMenuCategory, initialState)
    const { pending } = useFormStatus()

    const [newCategoryName, setNewCategoryName] = useState<string>(categoryName)


    useEffect(() => {
        if (state.success && !pending) {
            toast.success('Se modificó la categoría', {
                duration: 3000
            })
            onClose()
        }

        if (state.error && !pending) {
            toast.error('Error al editar categoria', {
                duration: 3000
            })
        }
    }, [state.success, state.error, pending, onClose])

    return (
        <form action={action}>
            <input type="hidden" name='categoryId' value={categoryId} />
            <input type="hidden" name='restaurantId' value={restaurantId} />
            <Input
                className="w-full mb-2"
                defaultValue={newCategoryName}
                name='categoryName'
                onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div className="flex justify-end gap-1 pt-2 px-0">
                <div>{children}</div>
                <SubmitButton />
            </div>
        </form>
    )
}