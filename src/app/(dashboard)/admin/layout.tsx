import { auth } from "@/src/auth"
import { redirect } from "next/navigation"
import AdminHeader from "@/src/components/admin/AdminHeader"

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth()

    // Protección: Solo admins
    if (!session || session.user?.role !== 'ADMIN') {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header del admin */}
            <AdminHeader
                userName={session.user.name || "Admin"}
                userRole={session.user.role}
            />

            {/* Contenido */}
            <main className="pb-20">
                {children}
            </main>
        </div>
    )
}

export default AdminLayout
