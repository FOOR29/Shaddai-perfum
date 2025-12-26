import { db } from "@/src/lib/db"
import PerfumeGrid from "./perfum/PerfumeGrid"

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

const PerfumeList = async () => {

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

    return <PerfumeGrid perfumes={perfumes} />
}

export default PerfumeList
