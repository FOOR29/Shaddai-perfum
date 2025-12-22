// aca van os tipados




export type PerfumeCardProps = {
    id: number | bigint  // El id puede ser BigInt según tu schema
    name: string
    brand: string  // nombre de la marca
    gender: "MASCULINO" | "FEMENINO" | "UNISEX"
    category: "ONE_ONE" | "PREPARADO"
    imageUrl: string
    isAvailable: boolean
}
