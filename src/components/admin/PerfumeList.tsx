import { Perfume, Brand } from "@prisma/client"
import PerfumeListItem from "./PerfumeListItem"

type PerfumeWithBrand = Perfume & {
    brand: Brand
}

type PerfumeListProps = {
    perfumes: PerfumeWithBrand[]
}

const PerfumeList = ({ perfumes }: PerfumeListProps) => {
    if (perfumes.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">No hay perfumes creados</p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {perfumes.map((perfume) => (
                <PerfumeListItem key={perfume.id.toString()} perfume={perfume} />
            ))}
        </div>
    )
}

export default PerfumeList
