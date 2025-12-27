import { db } from "@/src/lib/db"
import { notFound } from "next/navigation"
import PerfumeDetail from "@/src/components/perfum/PerfumeDetail"


// Función para obtener UN perfume por ID
async function getPerfumeById(id: string) {
    try {
        const perfume = await db.perfume.findUnique({
            where: {
                id: BigInt(id),
            },
            include: {
                brand: true,
            }
        })
        return perfume
    } catch (error) {
        console.error("Error al obtener perfume:", error)
        return null
    }
}


// Función para obtener las descripciones de las categorías
async function getCategoryInfo() {
    try {
        const categories = await db.perfumeCategoryInfo.findMany()
        return categories
    } catch (error) {
        console.error("Error al obtener categorías:", error)
        return []
    }
}


export default async function PerfumeDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const [perfume, categoryInfo] = await Promise.all([
        getPerfumeById(id),
        getCategoryInfo()
    ])

    if (!perfume) {
        notFound()
    }

    return <PerfumeDetail perfume={perfume} categoryInfo={categoryInfo} />
}
