import { IoArrowBack } from "react-icons/io5"
import Link from "next/link"
import PerfumeForm from "@/src/components/admin/PerfumeForm"
import { getBrandsAction } from "@/src/actions/perfume-actions"

const CreatePerfumePage = async () => {
    // Obtener marcas para el select
    const brandsResult = await getBrandsAction()
    const brands = brandsResult.data || []

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
                    <h1 className="text-xl font-extrabold text-titular">
                        Create Perfume
                    </h1>
                </div>
            </div>

            {/* Formulario */}
            <div className="px-4 py-6">
                <PerfumeForm mode="create" brands={brands} />
            </div>
        </div>
    )
}

export default CreatePerfumePage
