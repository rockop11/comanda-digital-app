"use client"
import { JSX, useState, FormEvent, ChangeEvent } from "react"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"

interface CredentialsProps {
    email: string;
    password: string
}

export const LoginForm = (): JSX.Element => {

    const router = useRouter()

    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [credentials, setCredentials] = useState<CredentialsProps>({
        email: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('')
        setIsLoading(true)

        const result = await signIn('credentials', {
            ...credentials,
            redirect: false
        })

        console.log({ result })

        setIsLoading(false)

        if (result?.error) {
            setError('Credenciales inválidas. Verifica email y contraseña.');
        } else if (result?.ok) {
            console.log(result)
            router.push('/dashboard');
        }

    };

    return (
        <>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                {/* Campo Email */}
                <input
                    id='email'
                    name='email'
                    type="email"
                    placeholder="Correo electrónico"
                    className=" border border-gray-300 p-3 rounded-lg "
                    required
                    onChange={handleChange}
                />

                {/* Campo Contraseña */}
                <input
                    id='password'
                    name='password'
                    type="password"
                    placeholder="Contraseña"
                    className="border border-gray-300 p-3 rounded-lg"
                    required
                    onChange={handleChange}
                />

                {/* Botón Ingresar */}
                <button
                    type="submit"
                    className="bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-200 cursor-pointer"
                >
                    Ingresar
                </button>
            </form>
        </>
    )
}