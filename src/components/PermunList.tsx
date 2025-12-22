import { db } from "@/src/lib/db"
import PerfumeCard from "./PerfumCard"

// 1. FUNCIÓN PARA OBTENER PERFUMES
// Esta función se ejecuta en el SERVIDOR (no en el navegador)
async function getPerfumes() {
    try {
        // Prisma obtiene todos los perfumes con su marca relacionada
        const perfumes = await db.perfume.findMany({
            include: {
                brand: true,  // Incluye los datos de la marca (relación)
            },
            orderBy: {
                createdAt: "desc"  // Los más recientes primero
            }
        })
        return perfumes
    } catch (error) {
        console.error("Error al obtener perfumes:", error)
        return []
    }
}

// 2. COMPONENTE PRINCIPAL
const PerfumeList = async () => {
    // Obtener los datos
    const perfumes = await getPerfumes()

    // Si no hay perfumes, mostrar mensaje
    if (perfumes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                    No hay perfumes disponibles
                </p>
            </div>
        )
    }

    // 3. RENDERIZAR GRID DE CARDS
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {perfumes.map((perfume) => (
                <PerfumeCard
                    key={perfume.id.toString()}  // BigInt a string para React
                    id={perfume.id}
                    name={perfume.name}
                    brand={perfume.brand.name}  // Accedemos al nombre de la marca
                    gender={perfume.gender}
                    imageUrl={perfume.imageUrl}
                    isAvailable={perfume.isAvailable}
                />
            ))}
        </div>
    )
}

export default PerfumeList
