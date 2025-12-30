import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./fonts.css"
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Shaddai Perfum",
  description: "Descubre nuestra exclusiva colección de perfumes de alta calidad. Réplicas exactas 1:1 y preparados artesanales para hombre, mujer y unisex. Catálogo actualizado con las mejores fragancias del mercado.",
  keywords: "perfumes, fragancias, perfumes de mujer, perfumes de hombre, perfumes unisex, réplicas de perfumes, perfumes 1:1, perfumes preparados, Shaddai Perfum",
  authors: [{ name: "Shaddai Perfum" }],
  creator: "Forlán Ordoñez",
  publisher: "Shaddai Perfum",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://shaddai-perfum.vercel.app",
    siteName: "Shaddai Perfum",
    title: "Shaddai Perfum",
    description: "Perfumes Originales, réplicas 1:1 y preparados artesanales. Descubre fragancias exclusivas para hombre, mujer y unisex.",
    images: [
      {
        url: "/og-image.jpg", // Opcional: agrega una imagen después
        width: 1200,
        height: 630,
        alt: "Shaddai Perfum - Catálogo de Perfumes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaddai Perfum",
    description: "Perfumes réplicas 1:1 y preparados artesanales. Fragancias exclusivas.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: "tu-codigo-de-verificacion", // Agregar cuando tengas Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 2500,
            style: {
              background: '#363636',
              color: '#fff',
              fontWeight: '600',
              borderRadius: '12px',
              padding: '12px 20px'
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
