import { JSX } from "react"
import { Settings, Smartphone, Zap } from "lucide-react"

export const FeatureSection = (): JSX.Element => {
    return (
        <section id="features" aria-label="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">¿Por qué Comanda Digital?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Transformá la experiencia de tus clientes con tecnología simple y efectiva
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Smartphone className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">100% Web</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Tus clientes no necesitan descargar ninguna app. Solo escanean el QR y acceden al menú desde su navegador.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-linear-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Actualización Instantánea</h3>
                        <p className="text-gray-700 leading-relaxed">
                            ¿Cambió el precio? ¿Nuevo plato? Actualizá y tus clientes lo ven al instante. Sin reimprimir menús.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-linear-to-br from-pink-50 to-pink-100 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Settings className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Panel de Control</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Gestioná tu menú completo desde un panel simple e intuitivo. Categorías, platos, precios y más.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}