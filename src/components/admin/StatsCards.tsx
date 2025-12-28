import { IoStorefrontOutline, IoMaleFemaleOutline, IoManOutline, IoWomanOutline } from "react-icons/io5"

type StatsCardsProps = {
    totalProducts: number
    menPerfumes: number
    womenPerfumes: number
}

const StatsCards = ({ totalProducts, menPerfumes, womenPerfumes }: StatsCardsProps) => {
    const stats = [
        {
            icon: IoStorefrontOutline,
            label: "Total de Perfumes",
            value: totalProducts,
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            icon: IoManOutline,
            label: "Perfumes de Hombre",
            value: menPerfumes,
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            icon: IoWomanOutline,
            label: "Perfumes de Mujer",
            value: womenPerfumes,
            bgColor: "bg-pink-50",
            iconColor: "text-pink-600"
        }
    ]

    return (
        <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
                >
                    <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-2`}>
                        <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                    <p className="text-2xl font-extrabold text-titular mb-1">
                        {stat.value}
                    </p>
                    <p className="text-xs text-subtitulo font-medium">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default StatsCards
