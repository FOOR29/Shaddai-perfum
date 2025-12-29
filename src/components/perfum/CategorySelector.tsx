"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PerfumeCategory } from "@prisma/client"


type CategorySelectorProps = {
    categoryInfo: Array<{
        category: PerfumeCategory
        title: string
        description: string
    }>
    defaultCategory: PerfumeCategory
}


const CategorySelector = ({ categoryInfo, defaultCategory }: CategorySelectorProps) => {
    const [selectedCategory, setSelectedCategory] = useState<PerfumeCategory>(defaultCategory)


    // Encontrar la info de la categoría seleccionada
    const currentInfo = categoryInfo.find(info => info.category === selectedCategory)


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4 bg-white rounded-2xl p-5 shadow-md"
        >
            {/* Título */}
            <h3 className="text-lg font-bold text-text-dark">
                Selecciona el tipo
            </h3>


            {/* Botones de selección */}
            <div className="flex gap-3">
                {categoryInfo.map((info) => {
                    const isSelected = selectedCategory === info.category
                    const label = info.category === "ONE_ONE" ? "1.1" : "Preparado"


                    return (
                        <motion.button
                            key={info.category}
                            onClick={() => setSelectedCategory(info.category)}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                scale: isSelected ? 1.05 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className={`
                                flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all
                                ${isSelected
                                    ? "bg-cta text-white shadow-lg"
                                    : "bg-gray-100 text-subtitulo hover:bg-gray-200"
                                }
                            `}
                        >
                            {label}
                        </motion.button>
                    )
                })}
            </div>


            {/* Descripción de la categoría seleccionada con animación */}
            <AnimatePresence mode="wait">
                {currentInfo && (
                    <motion.div
                        key={currentInfo.category}
                        initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                        <motion.h4
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="font-bold text-text-dark mb-2"
                        >
                            {currentInfo.title}
                        </motion.h4>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm text-gray-600 leading-relaxed"
                        >
                            {currentInfo.description}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}


export default CategorySelector
