"use client"

import { IoLogoWhatsapp } from "react-icons/io";
import "@/src/app/animations.css"

type WhatsAppButtonProps = {
    perfumeName: string
    brandName: string
}

const WhatsAppButton = ({ perfumeName, brandName }: WhatsAppButtonProps) => {

    const handleWhatsApp = () => {
        // Número de WhatsApp Business actualizado
        const phoneNumber = "573022039714" // +57 302 2039714 (formato sin espacios ni +)

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
            className="w-full bg-cta hover:bg-cta-hover text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
        >
            <IoLogoWhatsapp className="w-7 h-7 shake-bottom" />
            Me interesa!
        </button>
    )
}

export default WhatsAppButton
