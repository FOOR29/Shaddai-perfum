import Image from "next/image"
import Link from "next/link"
import { PerfumeCardProps } from "../../types"
import Button from "./Button"

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
        <div className="relative bg-card border-2 border-borde rounded-2xl overflow-hidden duration-300 flex flex-col h-full">
            {/* Badge de disponibilidad */}
            {isAvailable && (
                <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                    <span className="flex items-center gap-1 md:gap-2 bg-disponible-bg rounded-full px-2 py-0.5 md:px-3 md:py-1 text-disponible-text text-xs md:text-sm font-extrabold shadow-md">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-600 rounded-full animate-pulse"></span>
                        <span className="hidden sm:inline">Disponible</span>
                        <span className="sm:hidden">Disp.</span>
                    </span>
                </div>
            )}

            {/* Imagen del perfume - ALTURA FIJA */}
            <div className="relative w-full h-48 sm:h-72 md:h-80 lg:h-96 flex-shrink-0">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                />
            </div>

            {/* Información del perfume */}
            <div className="p-3 md:p-4 flex flex-col flex-grow">
                {/* Nombre del perfume (solo en móvil) */}
                <h3 className="md:hidden font-extrabold text-sm text-titular line-clamp-2 mb-1 min-h-[2.5rem]">
                    {name}
                </h3>

                {/* Nombre y género (en PC) */}
                <div className="hidden md:flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-extrabold text-lg text-titular line-clamp-2 flex-1 min-h-[3.5rem]">
                        {name}
                    </h3>
                    <span className="text-sm text-center bg-chip-inactivo py-0.5 px-3 rounded-full text-secundario font-extrabold whitespace-nowrap flex-shrink-0">
                        {getGenderLabel(gender)}
                    </span>
                </div>

                {/* Marca */}
                <p className="text-xs md:text-sm text-secundario font-extrabold mb-3 md:mb-4 line-clamp-1">
                    {brand} · Original
                </p>

                {/* Botón - SIEMPRE AL FINAL */}
                <div className="mt-auto">
                    <Link href={`/perfum/${id}`}>
                        <Button className="w-full primary text-sm md:text-base py-2 md:py-2.5">
                            Ver más
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PerfumeCard
