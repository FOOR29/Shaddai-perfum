import { IoArrowBack } from "react-icons/io5"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import PerfumeForm from "@/src/components/forms/PerfumeForm"
import { getPerfumeByIdAction, getBrandsAction } from "@/src/actions/perfume-actions"

type EditPerfumePageProps = {
    params: Promise<{
        id: string
    }>
}

const EditPerfumePage = async ({ params }: EditPerfumePageProps) => {
    const { id } = await params

    // Obtener el perfume
    const perfumeResult = await getPerfumeByIdAction(id)

    if (!perfumeResult.success || !perfumeResult.data) {
        notFound()
    }

    // Obtener marcas para el select
    const brandsResult = await getBrandsAction()
    const brands = brandsResult.data || []

    const perfume = perfumeResult.data

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin"
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <IoArrowBack className="w-6 h-6 text-titular" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-extrabold text-titular">
                            Editar Perfume
                        </h1>
                        <p className="text-sm text-subtitulo">
                            {perfume.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Formulario */}
            <div className="px-4 py-6">
                <PerfumeForm
                    mode="edit"
                    perfume={{
                        id: perfume.id,
                        name: perfume.name,
                        brandId: perfume.brandId,
                        gender: perfume.gender,
                        category: perfume.category,
                        description: perfume.description,
                        imageUrl: perfume.imageUrl,
                        isAvailable: perfume.isAvailable
                    }}
                    brands={brands}
                />
            </div>
        </div>
    )
}

export default EditPerfumePage
