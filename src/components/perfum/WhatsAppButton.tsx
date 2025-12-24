"use client"

type WhatsAppButtonProps = {
    perfumeName: string
    brandName: string
}

const WhatsAppButton = ({ perfumeName, brandName }: WhatsAppButtonProps) => {

    const handleWhatsApp = () => {
        // Número de WhatsApp Business (CAMBIA ESTE NÚMERO)
        const phoneNumber = "573001234567" // Formato: código país + número sin espacios

        // Mensaje predefinido
        const message = encodeURIComponent(
            `¡Hola! Me interesa el perfume:\n\n` +
            `📦 ${perfumeName}\n` +
            `🏷️ Marca: ${brandName}\n\n` +
            `¿Podrían darme más información?`
        )

        // URL de WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank')
    }

    return (
        <button
            onClick={handleWhatsApp}
            className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 1.83.49 3.54 1.35 5.01L2 22l5.19-1.32C8.61 21.51 10.27 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.85 14.2c-.24.69-1.4 1.28-1.95 1.34-.54.06-1.08.25-3.58-.75-3.16-1.26-5.19-4.47-5.35-4.68-.15-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.63-.4.84-.4.21 0 .42.01.6.01.19 0 .45-.07.7.53.26.6.88 2.14.96 2.3.08.15.13.33.03.54-.11.21-.16.34-.32.52-.16.18-.34.4-.48.54-.16.15-.32.32-.14.63.18.31.82 1.35 1.76 2.19 1.21 1.08 2.23 1.42 2.55 1.58.32.16.51.13.7-.08.19-.21.82-.96 1.04-1.29.22-.33.44-.28.74-.17.3.12 1.9.9 2.23 1.06.32.16.54.24.62.37.08.13.08.75-.16 1.44z" />
            </svg>
            ¡Me interesa!
        </button>
    )
}

export default WhatsAppButton
