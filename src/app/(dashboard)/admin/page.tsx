import { auth } from "@/src/auth"
import { db } from "@/src/lib/db"
import StatsCards from "@/src/components/admin/StatsCards"
import PerfumeList from "@/src/components/admin/PerfumeList"
import Link from "next/link"
import { IoAdd } from "react-icons/io5"

// Función para obtener estadísticas
async function getStats() {
    const totalPerfumes = await db.perfume.count()
    const pendingReviews = await db.perfume.count({
        where: { isAvailable: false }
    })
    // Total views: por ahora simulado, después puedes agregar una tabla de analytics
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

    return (
        <div className="relative">
            {/* Stats Cards */}
            <div className="px-4 pt-4 pb-6">
                <StatsCards
                    totalProducts={stats.totalPerfumes}
                    pendingReviews={stats.pendingReviews}
                    totalViews={stats.totalViews}
                />
            </div>

            {/* Lista de perfumes */}
            <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-titular">All Products</h2>
                    <Link
                        href="/admin/perfumes"
                        className="text-sm font-semibold text-cta hover:underline"
                    >
                        View All
                    </Link>
                </div>

                <PerfumeList perfumes={perfumes} />
            </div>

            {/* Botón flotante para crear */}
            <Link
                href="/admin/perfumes/create"
                className="fixed bottom-6 right-6 w-14 h-14 bg-cta hover:bg-cta-hover text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
            >
                <IoAdd className="w-8 h-8" />
            </Link>
        </div>
    )
}

export default AdminPage
