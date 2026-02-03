import { JSX } from "react"
import { ContactForm } from "@/components/LandingPage"

export const ContactSection = (): JSX.Element => {
  return (
    <section id="contact" aria-label="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">¿Listo para digitalizar tu menú?</h2>
          <p className="text-xl text-gray-600">
            Dejanos tus datos y nos contactamos a la brevedad
          </p>
        </div>

        <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}