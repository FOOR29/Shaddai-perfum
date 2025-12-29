"use client"

import { useState } from "react"
import AdminHeader from "@/src/components/admin/AdminHeader"

const AdminLayoutClient = ({
    children,
    userName,
    userRole
}: {
    children: React.ReactNode
    userName: string
    userRole: string
}) => {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="min-h-screen bg-background">
            {/* Header del admin con búsqueda */}
            <AdminHeader
                userName={userName}
                userRole={userRole}
                onSearch={setSearchQuery}
            />

            {/* Contenido con contexto de búsqueda */}
            <main className="pb-20">
                <div data-search-query={searchQuery}>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default AdminLayoutClient
