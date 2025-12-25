"use client"

import { IoLogoWhatsapp } from "react-icons/io";
import "@/src/app/animations.css"

type WhatsAppButtonProps = {
    perfumeName: string
    brandName: string
    perfumeId: string | number  // 👈 NUEVO: ID del perfume
    gender?: string              // 👈 NUEVO: Género (opcional)
}

const WhatsAppButton = ({
    perfumeName,
    brandName,
    perfumeId,
    gender
}: WhatsAppButtonProps) => {

    const handleWhatsApp = () => {
        // Número de WhatsApp Business actualizado
        const phoneNumber = "573022039714"

        // 👇 NUEVO: Construir URL completa del perfume
        const perfumeUrl = `${window.location.origin}/perfum/${perfumeId}`

        // 👇 NUEVO: Construir mensaje con más información
        let message = `¡Hola! Me interesa el perfume:\n\n` +
            `📦 *${perfumeName}*\n` +
            `🏷️ Marca: ${brandName}\n`

        // Agregar género si existe
        if (gender) {
            const genderLabel = gender === "MASCULINO" ? "Masculino" :
                gender === "FEMENINO" ? "Femenino" : "Unisex"
            message += `👤 Género: ${genderLabel}\n`
        }

        // 👇 IMPORTANTE: Agregar link del perfume
        message += `\n🔗 Ver perfume: ${perfumeUrl}\n\n` +
            `¿Podrían darme más información?`

        // URL de WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

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
