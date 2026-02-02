'use client'

import { ChangeEvent, FormEvent, JSX, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { sendEmail } from "@/services/sendEmail"
import { ChevronRight } from "lucide-react"
import { captureServiceError } from "@/lib/sentry"

interface EmailTemplateParams {
    from_name: string;
    restaurant: string;
    email: string;
    message: string;
    reply_to?: string;
}


export const ContactForm = (): JSX.Element => {

    const [errorMessage, setErrorMessage] = useState<string>('')
    const [emailValues, setEmailValues] = useState<EmailTemplateParams>({
        from_name: '',
        restaurant: '',
        email: '',
        message: '',
    })

    const emailValuesHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setEmailValues((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const sendEmailHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            !emailValues.from_name ||
            !emailValues.restaurant ||
            !emailValues.email ||
            !emailValues.message
        ) {
            setErrorMessage('Debe completar los campos*')
            return
        }

        try {
            await sendEmail({
                ...emailValues,
                reply_to: emailValues.email
            })
        } catch (error) {
            captureServiceError(error, {
                level: 'error',
                service: 'email service',
                action: 'send email',
                extra: { emailValues }
            })
        }
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={sendEmailHandler}>
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Dejanos tu consulta</h3>
                <p className="text-gray-600">Completá el formulario y te contactamos</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                        Nombre y Apellido
                    </Label>
                    <Input
                        autoComplete="off"
                        type="text"
                        id="fullName"
                        name="from_name"
                        placeholder="Juan Pérez"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        onChange={emailValuesHandler}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="restaurantName" className="text-sm font-semibold text-gray-700">
                        Nombre del restaurante
                    </Label>
                    <Input
                        autoComplete="off"
                        type="text"
                        id="restaurantName"
                        name="restaurant"
                        placeholder="Mi Restaurante"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        onChange={emailValuesHandler}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email
                </Label>
                <Input
                    autoComplete="off"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={emailValuesHandler}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-semibold text-gray-700">
                    Motivo de consulta
                </Label>
                <Textarea
                    autoComplete="off"
                    id="reason"
                    name="message"
                    rows={4}
                    placeholder="Contanos qué necesitás..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    onChange={emailValuesHandler}
                />
            </div>

            {errorMessage && (
                <div className="space-y-2">
                    <p className="text-center text-red-700 text-sm">{errorMessage}</p>
                </div>
            )}

            <Button
                type="submit"
                className="w-full px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
                Enviar consulta
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
        </form>
    )
}