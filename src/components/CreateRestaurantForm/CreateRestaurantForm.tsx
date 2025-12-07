'use client'

import { JSX, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { createRestaurantAction } from '@/actions/createRestaurant/restaurant-actions'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

interface FormState {
    error?: string;
    success?: boolean;
}

const initialState: FormState = {
    error: undefined,
    success: false
};

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button
            type='submit'
            disabled={pending}
            className='cursor-pointer flex items-center justify-center'
        >
            {pending ? (
                <>
                    <Spinner />
                    <span className="ml-2">Creando...</span>
                </>
            ) : (
                'Crear'
            )}
        </Button>
    );
}

export const CreateRestaurantForm = (): JSX.Element => {

    const router = useRouter()

    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useFormState(createRestaurantAction, initialState);

    useEffect(() => {
        if (state.success) {
            router.push('/admin');
        }
    }, [state.success, router]);

    return (
        <>
            <form action={formAction} ref={formRef} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <h4 className='font-bold'>Datos del Restaurant</h4>
                    <Input
                        placeholder='Nombre del Restaurant*'
                        name='name'
                        required
                    />

                    <Input
                        placeholder='Ruta del Restaurante*'
                        name='slug'
                        required
                    />

                    <Input
                        type='file'
                        name='image'
                        required
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <h4 className='font-bold'>Datos del Usuario</h4>

                    <Input
                        placeholder='Nombre del Usuario*'
                        name='adminName'
                        required
                    />

                    <Input
                        placeholder='Email del Usuario*'
                        name='adminEmail'
                        required
                    />

                    <Input
                        type='password'
                        placeholder='Contraseña*'
                        name='adminPassword'
                        required
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <h4 className='font-bold'>Wifi</h4>

                    <Input
                        placeholder='Nombre de Red*'
                        name='wifiName'
                        required
                    />

                    <Input
                        placeholder='Contraseña Wifi*'
                        name='wifiPassword'
                        required
                    />
                </div>

                <SubmitButton />
            </form>
        </>
    )
}
