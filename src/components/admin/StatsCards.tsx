import { IoStorefrontOutline, IoTimeOutline, IoEyeOutline } from "react-icons/io5"

type StatsCardsProps = {
    totalProducts: number
    pendingReviews: number
    totalViews: number
}

const StatsCards = ({ totalProducts, pendingReviews, totalViews }: StatsCardsProps) => {
    const stats = [
        {
            icon: IoStorefrontOutline,
            label: "Total Products",
            value: totalProducts,
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            icon: IoTimeOutline,
            label: "Pending reviews",
            value: pendingReviews,
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600"
        },
        {
            icon: IoEyeOutline,
            label: "Total Views",
            value: totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews,
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600"
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
