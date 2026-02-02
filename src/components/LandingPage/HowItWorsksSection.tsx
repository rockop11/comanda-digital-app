import { JSX } from "react"
import { User, Store, QrCode, Smartphone } from 'lucide-react';

export const HowItWorksSection = (): JSX.Element => {
    return (
        <section id="how-it-works" aria-label="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">¿Cómo funciona?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        En 4 pasos simples tenés tu menú digital funcionando
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            step: '01',
                            title: 'Te registramos',
                            description: 'Nos contactás y creamos tu cuenta personalizada con tu URL única.',
                            icon: User
                        },
                        {
                            step: '02',
                            title: 'Cargás tu menú',
                            description: 'Desde el panel agregás categorías, platos, precios y fotos.',
                            icon: Store
                        },
                        {
                            step: '03',
                            title: 'Recibís tu QR',
                            description: 'Te enviamos el código QR listo para imprimir con tu branding.',
                            icon: QrCode
                        },
                        {
                            step: '04',
                            title: '¡Listo!',
                            description: 'Tus clientes escanean y acceden al menú digital al instante.',
                            icon: Smartphone
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="relative">
                            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                <div className="text-5xl font-bold text-gray-100 mb-4">{item.step}</div>
                                <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                            {idx < 3 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-linear-to-r from-blue-600 to-purple-600"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}