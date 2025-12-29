import { auth } from "@/src/auth"
import { redirect } from "next/navigation"
import AdminLayoutClient from "@/src/components/admin/AdminLayoutClient"

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth()

    // Protección: Solo admins
    if (!session || session.user?.role !== 'ADMIN') {
        redirect('/login')
    }

    return (
        <AdminLayoutClient
            userName={session.user.name || "Admin"}
            userRole={session.user.role}
        >
            {children}
        </AdminLayoutClient>
    )
}

export default AdminLayout
