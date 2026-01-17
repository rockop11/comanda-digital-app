'use client'
import { ChangeEvent, JSX, ReactNode, useEffect, useState } from "react";
import { editRestaurantImage } from "@/actions/restaurant/editRestaurantImage/editRestaurantImage";
import Image from "next/image";
import { Input } from "../ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "react-hot-toast";

interface EditRestaurantImageFormProps {
    restaurantId: number;
    children: ReactNode;
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

export const EditRestaurantImageForm = ({ restaurantId, children, onClose }: EditRestaurantImageFormProps): JSX.Element => {

    const { pending } = useFormStatus()
    const [state, formAction] = useFormState(editRestaurantImage, initialState)
    const [fileUploaded, setFileUploaded] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null);

    const uploadFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const selectedFile = files[0];
        setFileUploaded(selectedFile);

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    useEffect(() => {
        if (state.success && !pending) {
            toast.success('Imagen actualizada', { duration: 3000 })
            onClose()
        }

        if (state.error && !pending) {
            toast.error('Error al actualizar la imagen', { duration: 3000 })
        }
    }, [state, pending, onClose])

    return (
        <form action={formAction}>
            <Input type='hidden' name='restaurantId' value={restaurantId} />
            <Input type="file" onChange={uploadFileHandler} name='imageFile' />

            {preview && (
                <div className="mt-1">
                    <Image
                        src={preview}
                        alt="Vista previa del restaurante"
                        width={200}
                        height={200}
                        className="object-cover rounded-md"
                    />
                </div>
            )}

            <div className="flex justify-end gap-1 pt-2 px-0">
                <div>{children}</div>
                <SubmitButton />
            </div>
        </form>
    )
}