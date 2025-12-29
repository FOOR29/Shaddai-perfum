import { db } from "@/src/lib/db"
import AdminPageClient from "@/src/components/admin/AdminPageClient"

async function getStats() {
    const totalPerfumes = await db.perfume.count()

    const menPerfumes = await db.perfume.count({
        where: { gender: "MASCULINO" }
    })

    const womenPerfumes = await db.perfume.count({
        where: { gender: "FEMENINO" }
    })

    return {
        totalPerfumes,
        menPerfumes,
        womenPerfumes
    }
}

// Función para obtener perfumes
async function getPerfumes() {
    return await db.perfume.findMany({
        include: {
            brand: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

const AdminPage = async () => {
    const stats = await getStats()
    const perfumes = await getPerfumes()

    return <AdminPageClient initialPerfumes={perfumes} stats={stats} />
}

export default AdminPage
