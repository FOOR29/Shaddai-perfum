import { db } from "@/src/lib/db"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import CategorySelector from "@/src/components/perfum/CategorySelector"
import WhatsAppButton from "@/src/components/perfum/WhatsAppButton"

// Función para obtener UN perfume por ID
async function getPerfumeById(id: string) {
    try {
        const perfume = await db.perfume.findUnique({
            where: {
                id: BigInt(id), // Convertir string a BigInt
            },
            include: {
                brand: true, // Incluir datos de la marca
            }
        })
        return perfume
    } catch (error) {
        console.error("Error al obtener perfume:", error)
        return null
    }
}

// Función para obtener las descripciones de las categorías
async function getCategoryInfo() {
    try {
        const categories = await db.perfumeCategoryInfo.findMany()
        return categories
    } catch (error) {
        console.error("Error al obtener categorías:", error)
        return []
    }
}

// Función auxiliar para el género
function getGenderLabel(gender: string) {
    switch (gender) {
        case "MASCULINO":
            return "Masculino"
        case "FEMENINO":
            return "Femenino"
        case "UNISEX":
            return "Unisex"
        default:
            return "N/A"
    }
}

export default async function PerfumeDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const [perfume, categoryInfo] = await Promise.all([
        getPerfumeById(id),
        getCategoryInfo()
    ])

    if (!perfume) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 bg-white shadow-sm p-4 flex items-center gap-4">
                <Link
                    href="/"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-cta hover:bg-cta-hover text-cta-text transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </Link>
                <h1 className="text-lg font-extrabold text-titular truncate">
                    Shaddai Perfum
                </h1>
            </header>

            {/* Contenido principal */}
            <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Imagen del perfume */}
                <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-200 to-purple-300">
                    <Image
                        src={perfume.imageUrl}
                        alt={perfume.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Información del perfume */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-subtitulo uppercase tracking-wide">
                            {perfume.brand.name} · {getGenderLabel(perfume.gender)}
                        </p>
                    </div>

                    {/* Nombre */}
                    <h2 className="text-3xl font-extrabold text-titular">
                        {perfume.name}
                    </h2>

                    {/* Descripción del perfume */}
                    <p className="text-subtitulo leading-relaxed">
                        {perfume.description}
                    </p>
                </div>

                {/* Selector de categoría */}
                <CategorySelector
                    categoryInfo={categoryInfo}
                    defaultCategory={perfume.category}
                />

                {/* Botón de WhatsApp */}
                <WhatsAppButton
                    perfumeName={perfume.name}
                    brandName={perfume.brand.name}
                />
            </main>
        </div>
    )
}
