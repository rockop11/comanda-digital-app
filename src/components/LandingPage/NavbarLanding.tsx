'use client'

import { JSX, useState } from "react";
import { QrCode, Menu, X } from "lucide-react";

export const NavbarLanding = (): JSX.Element => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white shrink-0" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Comanda Digital
            </span>
          </div>


          <nav className="hidden md:flex items-center gap-4 md:gap-4 lg:gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Características
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              Cómo funciona
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contacto
            </a>
            <a
              href="/login"
              className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Iniciar sesión
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col p-4 gap-4">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Características
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
              Cómo funciona
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">
              Contacto
            </a>
            <a
              href="/login"
              className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center"
            >
              Iniciar sesión
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}