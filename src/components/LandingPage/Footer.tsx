import { JSX } from "react";
import { Mail, QrCode } from 'lucide-react';

export const Footer = ():JSX.Element => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Comanda Digital</span>
              </div>
              <p className="text-gray-400">
                Modernizá tu restaurante con menús digitales accesibles por QR.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Cómo funciona</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Iniciar sesión</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  poncerodrigom@gmail.com
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Comanda Digital. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    )
}