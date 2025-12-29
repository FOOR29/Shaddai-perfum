"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { IoSearch } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"

type PerfumeResult = {
    id: string  // 👈 CAMBIO: string en lugar de bigint
    name: string
    brandName: string
    imageUrl: string
}

const SearchBar = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<PerfumeResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Buscar perfumes en tiempo real
    useEffect(() => {
        const searchPerfumes = async () => {
            if (query.trim().length < 2) {
                setResults([])
                setShowResults(false)
                return
            }

            setIsLoading(true)
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
                const data = await response.json()
                setResults(data)
                setShowResults(true)
            } catch (error) {
                console.error("Error en búsqueda:", error)
                setResults([])
            } finally {
                setIsLoading(false)
            }
        }

        const debounce = setTimeout(searchPerfumes, 300)
        return () => clearTimeout(debounce)
    }, [query])

    // Cerrar resultados al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Ir al perfume seleccionado
    const handleSelectPerfume = (id: string) => {  // 👈 CAMBIO: string
        router.push(`/perfum/${id}`)
        setQuery("")
        setShowResults(false)
    }

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
            {/* Input de búsqueda */}
            <div className="relative">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setShowResults(true)}
                    placeholder="Buscar perfume..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:border-cta transition-colors text-titular placeholder:text-gray-400"
                />
            </div>

            {/* Resultados de búsqueda */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50"
                    >
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-500">
                                Buscando...
                            </div>
                        ) : results.length > 0 ? (
                            <ul className="py-2">
                                {results.map((perfume) => (
                                    <li key={perfume.id}>
                                        <button
                                            onClick={() => handleSelectPerfume(perfume.id)}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                        >
                                            <img
                                                src={perfume.imageUrl}
                                                alt={perfume.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <p className="font-bold text-titular">
                                                    {perfume.name}
                                                </p>
                                                <p className="text-sm text-subtitulo">
                                                    {perfume.brandName}
                                                </p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No se encontraron resultados
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SearchBar
