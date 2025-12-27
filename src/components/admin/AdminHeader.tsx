"use client"

import { useState } from "react"
import { IoSearchOutline, IoMenuOutline } from "react-icons/io5"
import { RiAdminFill } from "react-icons/ri"
import LogoutButton from "../ui/LogoutButton"

type AdminHeaderProps = {
    userName: string
    userRole: string
    onSearch: (query: string) => void  // ✅ AGREGAR callback
}

const AdminHeader = ({ userName, userRole, onSearch }: AdminHeaderProps) => {
    const [showMenu, setShowMenu] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")  // ✅ AGREGAR estado

    // ✅ Manejar búsqueda
    const handleSearch = (value: string) => {
        setSearchQuery(value)
        onSearch(value)  // Enviar query al padre
    }

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Búsqueda */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}  // ✅ Valor controlado
                            onChange={(e) => handleSearch(e.target.value)}  // ✅ Handler
                            placeholder="Search by name, brand or version..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cta focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Menú hamburguesa */}
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="ml-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <IoMenuOutline className="w-6 h-6 text-gray-700" />
                </button>
            </div>

            {/* Dropdown del menú */}
            {showMenu && (
                <div className="absolute top-full right-4 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
                    {/* Info del admin */}
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                        <div className="w-12 h-12 bg-cta rounded-full flex items-center justify-center">
                            <RiAdminFill className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-titular text-sm">{userName}</p>
                            <p className="text-xs text-subtitulo">{userRole}</p>
                        </div>
                    </div>

                    {/* Botón logout */}
                    <div className="pt-4">
                        <LogoutButton />
                    </div>
                </div>
            )}
        </header>
    )
}

export default AdminHeader
