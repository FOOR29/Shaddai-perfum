"use client"

import { Perfume, Brand } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { IoPencil, IoTrash } from "react-icons/io5"
import { deletePerfumeAction } from "@/src/actions/perfume-actions"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

type PerfumeWithBrand = Perfume & {
    brand: Brand
}

type PerfumeListItemProps = {
    perfume: PerfumeWithBrand
}

const PerfumeListItem = ({ perfume }: PerfumeListItemProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleDelete = async () => {
        if (!confirm(`¿Eliminar "${perfume.name}"?`)) return

        startTransition(async () => {
            const result = await deletePerfumeAction(perfume.id)
            if (result.success) {
                router.refresh()
            } else {
                alert(result.error)
            }
        })
    }

    // Badge de stock
    const getStockBadge = () => {
        if (!perfume.isAvailable) {
            return <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">Out of Stock</span>
        }
        // Aquí puedes agregar lógica para "Low in stock" si tienes un campo de cantidad
        return <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">In Stock</span>
    }

    // Label de categoría
    const getCategoryLabel = () => {
        switch (perfume.category) {
            case "ONE_ONE": return "1:1"
            case "PREPARADO": return "Preparado"
            default: return perfume.category
        }
    }

    return (
        <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm flex items-center gap-3">
            {/* Imagen */}
            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    src={perfume.imageUrl}
                    alt={perfume.name}
                    fill
                    className="object-cover"
                />
                {/* Badge de categoría en la imagen */}
                <div className="absolute top-1 left-1">
                    <span className="px-1.5 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded">
                        {getCategoryLabel()}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-titular text-sm mb-1 truncate">
                    {perfume.name}
                </h3>
                <p className="text-xs text-subtitulo mb-2">
                    {perfume.brand.name} • {getCategoryLabel()} • {perfume.gender}
                </p>
                {getStockBadge()}
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                    href={`/admin/perfumes/${perfume.id}/edit`}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <IoPencil className="w-4 h-4 text-gray-700" />
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                >
                    <IoTrash className="w-4 h-4 text-red-600" />
                </button>
            </div>
        </div>
    )
}

export default PerfumeListItem
