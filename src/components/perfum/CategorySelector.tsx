"use client"

import { useState } from "react"
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
        <div className="space-y-4 bg-white rounded-2xl p-5 shadow-md">
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
                        <button
                            key={info.category}
                            onClick={() => setSelectedCategory(info.category)}
                            className={`
                                flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all
                                ${isSelected
                                    ? "bg-cta text-white shadow-lg scale-105"
                                    : "bg-gray-100 text-subtitulo hover:bg-gray-200"
                                }
                            `}
                        >
                            {label}
                        </button>
                    )
                })}
            </div>

            {/* Descripción de la categoría seleccionada */}
            {currentInfo && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-text-dark mb-2">
                        {currentInfo.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {currentInfo.description}
                    </p>
                </div>
            )}
        </div>
    )
}

export default CategorySelector
