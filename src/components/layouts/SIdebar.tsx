"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { RiAdminFill, RiInstagramFill } from "react-icons/ri"
import { FaShareAlt } from "react-icons/fa"
import { IoLogoWhatsapp } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import toast from 'react-hot-toast'

type SidebarProps = {
    isOpen: boolean
    onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {

    const handleShare = async () => {
        const url = window.location.origin
        try {
            await navigator.clipboard.writeText(url)
            toast.success('¡Enlace copiado al portapapeles!', {
                position: "bottom-center",
                duration: 2500,
                icon: '✓',
            })
        } catch (err) {
            console.error("Error al copiar:", err)
            toast.error('No se pudo copiar el enlace', {
                position: "bottom-center"
            })
        }
    }

    // Variantes de animación
    const sidebarVariants = {
        closed: {
            x: "-100%",
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        },
        open: {
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        }
    }

    return (
        // Sidebar móvil SOLAMENTE (desplegable)
        <AnimatePresence>
            {isOpen && (
                <motion.aside
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sidebarVariants}
                    className="fixed top-0 left-0 h-full w-64 bg-cta z-50 shadow-2xl overflow-y-auto"
                >
                    {/* Header del sidebar */}
                    <div className="flex items-center justify-between p-4 border-b border-cta-hover">
                        <h2 className="text-xl font-extrabold text-white">
                            SHADDAI PERFUM
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-cta-hover rounded-lg p-2 transition-colors"
                        >
                            <IoClose className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Menú */}
                    <nav className="py-6">
                        <ul className="space-y-2 px-4">
                            {/* Admin */}
                            <li>
                                <Link
                                    href="/login"
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-cta-hover rounded-lg transition-colors font-semibold"
                                >
                                    <RiAdminFill className="w-6 h-6" />
                                    Admin
                                </Link>
                            </li>

                            {/* Whatsapp */}
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-cta-hover rounded-lg transition-colors font-semibold"
                                >
                                    <IoLogoWhatsapp className="w-6 h-6" />
                                    Whatsapp
                                </a>
                            </li>

                            {/* Instagram */}
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-cta-hover rounded-lg transition-colors font-semibold"
                                >
                                    <RiInstagramFill className="w-6 h-6" />
                                    Instagram
                                </a>
                            </li>

                            {/* Compartir */}
                            <li>
                                <button
                                    onClick={handleShare}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-cta-hover rounded-lg transition-colors font-semibold text-left"
                                >
                                    <FaShareAlt className="w-5 h-5" />
                                    Compartir
                                </button>
                            </li>
                        </ul>
                    </nav>
                </motion.aside>
            )}
        </AnimatePresence>
    )
}

export default Sidebar
