import Image from "next/image"
import Link from "next/link"
import { PerfumeCardProps } from "../types"


const PerfumeCard = ({
    id,
    name,
    brand,
    gender,
    category,
    imageUrl,
    isAvailable
}: PerfumeCardProps) => {

    // 2. FUNCIÓN AUXILIAR: Traduce el género del enum a texto legible
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

    // funcion para troducir la categoria
    const getCategory = (category: string) => {
        return category === "ONE_ONE" ? "Preparado" : "1.1"
    }

    return (
        // 3. ESTRUCTURA: Card con diseño similar a tu imagen
        <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            {/* Badge de disponibilidad (solo si está disponible) */}
            {isAvailable && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-black text-md font-extrabold shadow-md">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Disponible
                    </span>
                </div>
            )}

            {/* Imagen del perfume */}
            <div className="relative w-full aspect-square bg-gradient-to-br from-pink-200 to-purple-300">
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
                <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-extrabold text-lg text-gray-900 line-clamp-1">
                        {name}
                    </h3>
                    <span className="text-sm text-center bg-gray-200 py-0.5 px-3 rounded-full text-gray-600 font-extrabold whitespace">
                        {getGenderLabel(gender)}
                    </span>
                </div>

                {/* Marca */}
                <span className="text-sm text-gray-600 font-extrabold">
                    {brand} · {getCategory(category)}
                </span>

                {/* Botón Ver */}
                <Link href={`/perfumes/${id}`}>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200">
                        Ver mas
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default PerfumeCard
