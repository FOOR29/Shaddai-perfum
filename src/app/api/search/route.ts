import { NextResponse } from "next/server"
import { db } from "@/src/lib/db"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    if (query.length < 2) {
        return NextResponse.json([])
    }

    try {
        const perfumes = await db.perfume.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                    {
                        brand: {
                            name: {
                                contains: query,
                                mode: "insensitive"
                            }
                        }
                    }
                ],
                isAvailable: true
            },
            include: {
                brand: true
            },
            take: 5,
            orderBy: {
                createdAt: "desc"
            }
        })

        // Formatear resultados para el frontend
        const results = perfumes.map(p => ({
            id: p.id.toString(),
            name: p.name,
            brandName: p.brand.name,
            imageUrl: p.imageUrl
        }))

        return NextResponse.json(results)
    } catch (error) {
        console.error("Error en búsqueda:", error)
        return NextResponse.json([])
    }
}
