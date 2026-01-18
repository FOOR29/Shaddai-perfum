"use client"

import { motion } from "framer-motion"
import PerfumeCard from "../ui/PerfumCard"
import { Perfume, Brand } from "@prisma/client"

type PerfumeWithBrand = Perfume & {
    brand: Brand
}

type PerfumeGridProps = {
    perfumes: PerfumeWithBrand[]
}

const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.10,
        }
    }
}

const gridSquareVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0
    }
}

const PerfumeGrid = ({ perfumes }: PerfumeGridProps) => {
    return (
        <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 p-3 md:p-6"
        >
            {perfumes.map((perfume) => (
                <motion.div
                    key={perfume.id.toString()}
                    variants={gridSquareVariants}
                    className="h-full"
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
