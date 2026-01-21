import { JSX, ReactNode, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteDish } from "@/actions/restaurant/deleteDish/deleteDish";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "react-hot-toast";
import { Input } from "../ui/input";

interface DeleteDishFormProps {
    dishId: number;
    children: ReactNode;
    onClose: () => void;
}

const initialState = { success: false, error: null }

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            variant={'destructive'}
            className="cursor-pointer"
            disabled={pending}
        >
            {pending ? <Spinner /> : 'Eliminar'}
        </Button>
    );
};

export const DeleteDishForm = ({
    dishId,
    children,
    onClose
}: DeleteDishFormProps): JSX.Element => {

    const [state, action] = useFormState(deleteDish, initialState)
    const { pending } = useFormStatus();

    useEffect(() => {
        if (state.success && !pending) {
            toast.success(`Se eliminó el plato`, { duration: 3000 });
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
            <Input type="hidden" name="dishId" value={dishId} />

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