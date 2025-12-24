import Image from "next/image"
import Link from "next/link"
import { PerfumeCardProps } from "../types"
import Button from "./ui/Button"


const PerfumeCard = ({
    id,
    name,
    brand,
    gender,
    imageUrl,
    isAvailable
}: PerfumeCardProps) => {

    const getGenderLabel = (gender: string) => {
        switch (gender) {
            case "MASCULINO":
                return "Masculino"
            case "FEMENINO":
                return "Femenino"
            case "UNISEX":
                return "Unisex"
            default:
                return "N/A"
        }
    }

    return (
        <div className="relative bg-card border-2 border-borde rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            {/* Badge de disponibilidad (solo si está disponible) */}
            {isAvailable && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="flex items-center gap-2 bg-disponible-bg rounded-full px-3 py-1 text-disponible-text text-md font-extrabold shadow-md">
                        <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                        Disponible
                    </span>
                </div>
            )}

            {/* Imagen del perfume */}
            <div className="relative w-full h-84 md:h-80 lg:h-96">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Información del perfume */}
            <div className="p-4 space-y-2">
                {/* Nombre y género */}
                <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-lg text-titular line-clamp-1">
                        {name}
                    </h3>
                    <span className="text-sm text-center bg-chip-inactivo py-0.5 px-3 rounded-full text-subtitulo font-extrabold whitespace">
                        {getGenderLabel(gender)}
                    </span>
                </div>

                {/* Marca */}
                <span className="text-sm flex pb-2.5 text-secundario font-extrabold">
                    {brand} · Original
                </span>

                {/* Botón Ver */}
                <Link href={`/perfum/${id}`}>
                    <Button
                        className="w-full primary"
                    >
                        Ver mas
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default PerfumeCard