"use client"
import { JSX, useState, FormEvent, ChangeEvent } from "react"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { Eye, EyeOff } from 'lucide-react';

interface CredentialsProps {
    email: string;
    password: string
}

export const LoginForm = (): JSX.Element => {

    const router = useRouter()

    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [togglePassword, setTogglePassword] = useState<boolean>(false)
    const [credentials, setCredentials] = useState<CredentialsProps>({
        email: '',
        password: ''
    })

    const togglePasswordHandler = () => {
        setTogglePassword((prevState) => !prevState)
    }

    const getInputClasses = () => {
        if (error) {
            return "border-red-700 focus:ring-red-700 focus:border-red-500";
        }
        return "border-gray-300 focus:ring-blue-700 focus:border-blue-500";
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError('')
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('')
        setIsLoading(true)

        const { email, password } = credentials

        if (!email || !password) {
            setIsLoading(false)
            setError('Debe completar los campos.')
            return
        }

        try {
            const result = await signIn('credentials', {
                ...credentials,
                redirect: false
            })

            if (result?.error) {
                setError('Credenciales inválidas. Verifica email y contraseña.');
            } else if (result?.ok) {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Error Crítico de Conexión o Sistema:', err);
            setError('Ocurrió un error inesperado. Intente de nuevo más tarde.');
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                    placeholder="correo electronico"
                    name='email'
                    type='email'
                    value={credentials.email}
                    onChange={handleChange}
                    className={`p-3 rounded-lg border ${getInputClasses()}`}
                />

                <div className="relative">
                    <Input
                        name='password'
                        type={togglePassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        value={credentials.password}
                        onChange={handleChange}
                        className={`p-3 rounded-lg border ${getInputClasses()}`}
                    />

                    <button
                        type='button'
                        onClick={togglePasswordHandler}
                        className="absolute inset-y-1 right-0 flex items-center mr-3 bg-white text-gray-400 hover:text-gray-600 border-none">
                        {togglePassword ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Eye className="h-5 w-5 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Ocultar contraseña
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <EyeOff className="h-5 w-5 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Mostrar contraseña
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </button>
                </div>

                <Button
                    type='submit'
                    className="bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-200 cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading && (<Spinner />)}
                    Ingresar
                </Button>

                {error && (
                    <p className="text-red-700 text-center text-xs">{error}</p>
                )}
            </form>
        </>
    )
}