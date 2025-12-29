"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import CategorySelector from "./CategorySelector"
import WhatsAppButton from "../ui/WhatsAppButton"
import { Perfume, Brand, PerfumeCategoryInfo } from "@prisma/client"

type PerfumeWithBrand = Perfume & {
    brand: Brand
}

type PerfumeDetailProps = {
    perfume: PerfumeWithBrand
    categoryInfo: PerfumeCategoryInfo[]
}

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

const PerfumeDetail = ({ perfume, categoryInfo }: PerfumeDetailProps) => {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 bg-white shadow-sm p-4 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
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
                </button>
                <h1 className="text-lg font-extrabold text-titular truncate">
                    Shaddai Perfum
                </h1>
            </header>

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto px-4 py-6 space-y-6"
            >
                {/* Imagen del perfume animada */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-lg from-pink-200 to-purple-300"
                >
                    <Image
                        src={perfume.imageUrl}
                        alt={perfume.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Información del perfume */}
                <div className="space-y-3">
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-subtitulo uppercase tracking-wide">
                                {perfume.brand.name} · {getGenderLabel(perfume.gender)}
                            </p>
                        </div>
                    </motion.div>

                    {/* Nombre perfum */}
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl font-extrabold text-titular">
                            {perfume.name}
                        </h2>
                    </motion.div>

                    {/* Descripción del perfume */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-subtitulo leading-relaxed"
                        >
                            {perfume.description}
                        </motion.p>
                    </motion.div>
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
                    perfumeId={perfume.id.toString()}
                    gender={perfume.gender}
                />
            </motion.main>
        </div>
    )
}

export default PerfumeDetail
