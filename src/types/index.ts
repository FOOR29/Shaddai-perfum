import { PerfumeCategory } from "@prisma/client"

export type PerfumeCardProps = {
    id: number | bigint
    name: string
    brand: string
    gender: "MASCULINO" | "FEMENINO" | "UNISEX"
    category: PerfumeCategory
    imageUrl: string
    isAvailable: boolean
}

export type CategoryInfo = {
    category: PerfumeCategory
    title: string
    description: string
}
