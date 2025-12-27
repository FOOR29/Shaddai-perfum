"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

const GenderFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentGender = searchParams.get("gender") || "TODO"

    const handleFilter = (gender: string) => {
        if (gender === "TODO") {
            router.push("/")
        } else {
            router.push(`/?gender=${gender}`)
        }
        router.refresh()  // ✅ ASEGÚRATE DE TENER ESTO
    }

    const filters = [
        { value: "TODO", label: "Todo" },
        { value: "MASCULINO", label: "Hombre" },
        { value: "FEMENINO", label: "Mujer" },
        { value: "UNISEX", label: "Unisex" },
    ]

    return (
        <div className="px-6 py-4 -mb-2.5">
            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
                <div className="flex gap-2 min-w-max">
                    {filters.map((filter) => {
                        const isActive = currentGender === filter.value

                        return (
                            <motion.button
                                key={filter.value}
                                onClick={() => handleFilter(filter.value)}
                                whileTap={{ scale: 0.95 }}
                                className={`
                                    px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap
                                    ${isActive
                                        ? "bg-cta text-white shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }
                                `}
                            >
                                {filter.label}
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GenderFilter
