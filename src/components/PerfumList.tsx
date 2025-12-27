import { db } from "@/src/lib/db"
import PerfumeGrid from "./perfum/PerfumeGrid"
import { Gender } from "@prisma/client"

// Función para obtener perfumes con filtro opcional
async function getPerfumes(genderFilter?: Gender | null) {
    try {
        const whereClause: any = {
            isAvailable: true
        }

        if (genderFilter) {
            whereClause.gender = genderFilter
        }

        console.log('🔍 Filtrando con:', whereClause)

        const perfumes = await db.perfume.findMany({
            where: whereClause,
            include: {
                brand: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        console.log('📦 Perfumes encontrados:', perfumes.length)
        console.log('📋 Perfumes:', perfumes.map(p => ({
            id: p.id,
            name: p.name,
            gender: p.gender,
            isAvailable: p.isAvailable
        })))

        return perfumes
    } catch (error) {
        console.error("Error al obtener perfumes:", error)
        return []
    }
}

// Componente ahora acepta el filtro como prop
const PerfumeList = async ({ genderFilter }: { genderFilter?: Gender | null }) => {
    const perfumes = await getPerfumes(genderFilter)

    if (perfumes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                    No hay perfumes disponibles
                    {genderFilter && ` en la categoría seleccionada`}
                </p>
            </div>
        )
    }

    // ✅ AGREGAR KEY ÚNICA que cambie con cada filtro
    // Esto fuerza a React a desmontar y remontar PerfumeGrid
    const gridKey = genderFilter || 'all'

    return <PerfumeGrid key={gridKey} perfumes={perfumes} />
}

export default PerfumeList
