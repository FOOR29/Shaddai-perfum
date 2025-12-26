"use client"

import { motion } from "framer-motion"
import PerfumeCard from "../PerfumCard"
import { Perfume, Brand } from "@prisma/client"

type PerfumeWithBrand = Perfume & {
    brand: Brand
}

type PerfumeGridProps = {
    perfumes: PerfumeWithBrand[]
}

const gridContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.10,
        }
    }
}

const gridSquareVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}

const PerfumeGrid = ({ perfumes }: PerfumeGridProps) => {
    return (
        <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
        >
            {perfumes.map((perfume) => (
                <motion.div
                    key={perfume.id.toString()}
                    variants={gridSquareVariants}
                >
                    <PerfumeCard
                        id={perfume.id}
                        name={perfume.name}
                        brand={perfume.brand.name}
                        gender={perfume.gender}
                        category={perfume.category}
                        imageUrl={perfume.imageUrl}
                        isAvailable={perfume.isAvailable}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}

export default PerfumeGrid
