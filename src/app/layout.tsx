import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers as SessionProviders } from "@/components/SessionProvider/SessionProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Comanda Digital",
  description:
    "Comanda Digital es una app de menú QR para restaurantes. Mostrá tu carta online y mejorá la experiencia de tus clientes.",
  keywords: [
    "menú digital",
    "menú QR",
    "comanda digital",
    "software para restaurantes",
    "carta digital",
  ],
  openGraph: {
    title: "Comanda Digital",
    description:
      "Transformá tu restaurante con un menú QR moderno y fácil de usar.",
    url: "https://comanda-digital-app.vercel.app/",
    siteName: "Comanda Digital",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <SessionProviders>
          {children}
        </SessionProviders>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
