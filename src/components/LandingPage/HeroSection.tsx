import { JSX } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export const HeroSection = (): JSX.Element => {
  return (
    <section aria-label="resume-section" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                🚀 Digitaliza tu menú hoy mismo
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Modernizá tu restaurante con{' '}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Comanda Digital
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Comanda Digital es una plataforma de <strong>menú QR </strong>
              para restaurantes, bares y cafeterías que buscan modernizar su carta,
              reducir costos y mejorar la experiencia del cliente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://comanda-digital-app.vercel.app/restaurant/cafe-fake"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Ver Demo en Vivo
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all flex items-center justify-center gap-2"
              >
                Solicitar Información
              </a>
            </div>

            <div className="flex justify-center md:justify-start items-center gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Web-based</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Apps requeridas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Disponible</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src={'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop'}
                alt='Menú digital QR en smartphone para restaurante'
                className="rounded-2xl shadow-2xl w-full"
                width={800}
                height={1000}
              />
              {/* <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop"
                  alt="Menú digital en smartphone"
                  className="rounded-2xl shadow-2xl w-full"
                /> */}
            </div>
            <div className="absolute -z-10 top-8 -right-8 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -z-10 -bottom-8 -left-8 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}