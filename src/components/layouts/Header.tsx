"use client"

import { useState } from "react"
import { TiThMenu } from "react-icons/ti"
import { RiAdminFill } from "react-icons/ri"
import { motion } from "framer-motion"
import Link from "next/link"
import Sidebar from "./SIdebar"
import SearchBar from "../SearchBar"

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            {/* Header fijo */}
            <header className="sticky top-0 z-50 backdrop-blur-xs border-b border-gray-200">
                <div className="flex items-center gap-3 px-4 py-3 max-w-7xl mx-auto">
                    {/* Botón hamburguesa (solo móvil) */}
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-200 transition-colors"
                        aria-label="Menu"
                    >
                        <TiThMenu className="w-6 h-6 text-titular" />
                    </button>

                    {/* Logo (solo desktop) */}
                    <div className="hidden lg:block">
                        <h1 className="text-xl font-extrabold text-cta">
                            SHADDAI PERFUM
                        </h1>
                    </div>

                    {/* Buscador */}
                    <div className="flex-1">
                        <SearchBar />
                    </div>

                    {/* Botón Admin (solo desktop) */}
                    <Link
                        href="/login"
                        className="hidden lg:flex items-center gap-2 px-4 py-2 bg-cta text-white rounded-full hover:bg-cta-hover transition-colors font-semibold"
                    >
                        <RiAdminFill className="w-5 h-5" />
                        Admin
                    </Link>
                </div>
            </header>

            {/* Sidebar (solo móvil) */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Overlay oscuro cuando sidebar está abierto */}
            {isSidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
            )}
        </>
    )
}

export default Header
