"use client"

import { useEffect, useState } from "react"
import StatsCards from "@/src/components/admin/StatsCards"
import PerfumeList from "@/src/components/admin/PerfumeList"
import Link from "next/link"
import { IoAdd } from "react-icons/io5"

type Perfume = any

type AdminPageClientProps = {
    initialPerfumes: Perfume[]
    stats: {
        totalPerfumes: number
        menPerfumes: number
        womenPerfumes: number
    }
}

const AdminPageClient = ({ initialPerfumes, stats }: AdminPageClientProps) => {
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const element = document.querySelector('[data-search-query]')
        if (!element) return

        const updateSearch = () => {
            const query = element.getAttribute('data-search-query') || ""
            setSearchQuery(query)
        }

        const observer = new MutationObserver(updateSearch)
        observer.observe(element, { attributes: true, attributeFilter: ['data-search-query'] })

        return () => observer.disconnect()
    }, [])

    const filteredPerfumes = searchQuery.trim().length >= 2
        ? initialPerfumes.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : initialPerfumes

    return (
        <div className="relative">
            <div className="px-4 pt-4 pb-6">
                <StatsCards
                    totalProducts={stats.totalPerfumes}
                    menPerfumes={stats.menPerfumes}
                    womenPerfumes={stats.womenPerfumes}
                />
            </div>

            <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-titular">
                        Todo el catalogo
                        {searchQuery && ` (${filteredPerfumes.length})`}
                    </h2>
                </div>

                <PerfumeList perfumes={filteredPerfumes} />
            </div>

            <Link
                href="/admin/perfumes/create"
                className="fixed bottom-6 right-6 w-14 h-14 bg-cta hover:bg-cta-hover text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-40"
            >
                <IoAdd className="w-8 h-8" />
            </Link>
        </div>
    )
}

export default AdminPageClient
