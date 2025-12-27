import { db } from "@/src/lib/db"
import PerfumeGrid from "./perfum/PerfumeGrid"
import { Gender } from "@prisma/client"

// Función para obtener perfumes con filtro opcional
async function getPerfumes(genderFilter?: Gender | null) {
    try {
        const perfumes = await db.perfume.findMany({
            where: genderFilter
                ? { gender: genderFilter }  // Filtrar por género si existe
                : {},                        // Sin filtro = todos
            include: {
                brand: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })
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

    return <PerfumeGrid perfumes={perfumes} />
}

export default PerfumeList
