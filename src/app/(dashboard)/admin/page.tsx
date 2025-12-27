import { db } from "@/src/lib/db"
import AdminPageClient from "@/src/components/admin/AdminPageClient"

// Función para obtener estadísticas
async function getStats() {
    const totalPerfumes = await db.perfume.count()
    const pendingReviews = await db.perfume.count({
        where: { isAvailable: false }
    })
    const totalViews = 1200

    return { totalPerfumes, pendingReviews, totalViews }
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
