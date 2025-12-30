"use client"

import { Perfume, Brand } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { IoPencil, IoTrash } from "react-icons/io5"
import { deletePerfumeAction } from "@/src/actions/perfume-actions"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import Swal from 'sweetalert2'

type PerfumeWithBrand = Perfume & {
    brand: Brand
}

type PerfumeListItemProps = {
    perfume: PerfumeWithBrand
}

const PerfumeListItem = ({ perfume }: PerfumeListItemProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    // Handler con SweetAlert2
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '¿Eliminar este perfume?',
            text: `Se eliminará "${perfume.name}" permanentemente`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        })

        // Si confirma, proceder a eliminar
        if (result.isConfirmed) {
            startTransition(async () => {
                const deleteResult = await deletePerfumeAction(perfume.id)

                if (deleteResult.success) {
                    // Mensaje de éxito con SweetAlert2
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El perfume ha sido eliminado correctamente',
                        icon: 'success',
                        confirmButtonColor: '#10b981',
                        timer: 2000
                    })
                    router.refresh()
                } else {
                    // Mensaje de error con SweetAlert2
                    Swal.fire({
                        title: 'Error',
                        text: deleteResult.error || 'No se pudo eliminar el perfume',
                        icon: 'error',
                        confirmButtonColor: '#ef4444'
                    })
                }
            })
        }
    }

    // Badge de stock
    const getStockBadge = () => {
        if (!perfume.isAvailable) {
            return <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">Agotado</span>
        }
        return <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">Disponible</span>
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
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-titular text-sm mb-1 truncate">
                    {perfume.name}
                </h3>
                <p className="text-xs text-subtitulo mb-2">
                    {perfume.brand.name} • {perfume.gender}
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
