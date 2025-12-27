"use server"

import { auth } from "@/src/auth"
import { db } from "@/src/lib/db"
import { PerfumeSchema, UpdatePerfumeSchema } from "@/src/lib/zod"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Helper para verificar autenticación de admin
async function verifyAdmin() {
    const session = await auth()
    if (!session || session.user?.role !== 'ADMIN') {
        throw new Error("No autorizado")
    }

    // ✅ AGREGAR: Verificar que el ID existe
    if (!session.user.id) {
        throw new Error("ID de usuario no encontrado en la sesión")
    }

    return session.user
}

// ============================================
// 1. CREAR PERFUME
// ============================================
export async function createPerfumeAction(values: z.infer<typeof PerfumeSchema>) {
    try {
        const user = await verifyAdmin()

        // Validar con Zod
        const validatedData = PerfumeSchema.parse(values)

        // ✅ CORREGIDO: Convertir correctamente el ownerAdminId
        const ownerAdminId = typeof user.id === 'string' ? parseInt(user.id) : Number(user.id)

        // Verificar que el parsing fue exitoso
        if (isNaN(ownerAdminId)) {
            throw new Error(`ID de admin inválido: ${user.id}`)
        }

        console.log('Creando perfume con ownerAdminId:', ownerAdminId) // Debug

        // Crear perfume en la BD
        await db.perfume.create({
            data: {
                name: validatedData.name,
                brandId: parseInt(validatedData.brandId),
                gender: validatedData.gender,
                category: validatedData.category,
                description: validatedData.description,
                imageUrl: validatedData.imageUrl,
                isAvailable: validatedData.isAvailable,
                ownerAdminId: ownerAdminId  // ✅ Ya verificado
            }
        })

        revalidatePath("/admin")
        return { success: true, message: "Perfume creado exitosamente" }
    } catch (error) {
        console.error("Error al crear perfume:", error)
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message }
        }
        // ✅ Mostrar el mensaje de error real
        if (error instanceof Error) {
            return { success: false, error: error.message }
        }
        return { success: false, error: "Error al crear el perfume" }
    }
}

// ============================================
// 2. ACTUALIZAR PERFUME
// ============================================
export async function updatePerfumeAction(values: z.infer<typeof UpdatePerfumeSchema>) {
    try {
        await verifyAdmin()

        // Validar con Zod
        const validatedData = UpdatePerfumeSchema.parse(values)

        // Verificar que el perfume existe
        const perfume = await db.perfume.findUnique({
            where: { id: BigInt(validatedData.id) }
        })

        if (!perfume) {
            return { success: false, error: "Perfume no encontrado" }
        }

        // Actualizar en la BD
        await db.perfume.update({
            where: { id: BigInt(validatedData.id) },
            data: {
                name: validatedData.name,
                brandId: parseInt(validatedData.brandId),
                gender: validatedData.gender,
                category: validatedData.category,
                description: validatedData.description,
                imageUrl: validatedData.imageUrl,
                isAvailable: validatedData.isAvailable
            }
        })

        revalidatePath("/admin")
        revalidatePath(`/admin/perfumes/${validatedData.id}/edit`)
        return { success: true, message: "Perfume actualizado exitosamente" }
    } catch (error) {
        console.error("Error al actualizar perfume:", error)
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message }
        }
        if (error instanceof Error) {
            return { success: false, error: error.message }
        }
        return { success: false, error: "Error al actualizar el perfume" }
    }
}

// ============================================
// 3. ELIMINAR PERFUME
// ============================================
export async function deletePerfumeAction(perfumeId: bigint) {
    try {
        await verifyAdmin()

        // Verificar que existe
        const perfume = await db.perfume.findUnique({
            where: { id: perfumeId }
        })

        if (!perfume) {
            return { success: false, error: "Perfume no encontrado" }
        }

        // Eliminar de la BD
        await db.perfume.delete({
            where: { id: perfumeId }
        })

        revalidatePath("/admin")
        return { success: true, message: "Perfume eliminado exitosamente" }
    } catch (error) {
        console.error("Error al eliminar perfume:", error)
        if (error instanceof Error) {
            return { success: false, error: error.message }
        }
        return { success: false, error: "Error al eliminar el perfume" }
    }
}

// ============================================
// 4. OBTENER UN PERFUME POR ID (para editar)
// ============================================
export async function getPerfumeByIdAction(perfumeId: string) {
    try {
        await verifyAdmin()

        const perfume = await db.perfume.findUnique({
            where: { id: BigInt(perfumeId) },
            include: {
                brand: true
            }
        })

        if (!perfume) {
            return { success: false, error: "Perfume no encontrado" }
        }

        // Convertir BigInt a string para JSON
        return {
            success: true,
            data: {
                ...perfume,
                id: perfume.id.toString(),
                brandId: perfume.brandId.toString(),
                ownerAdminId: perfume.ownerAdminId.toString()
            }
        }
    } catch (error) {
        console.error("Error al obtener perfume:", error)
        if (error instanceof Error) {
            return { success: false, error: error.message }
        }
        return { success: false, error: "Error al obtener el perfume" }
    }
}

// ============================================
// 5. OBTENER TODAS LAS MARCAS (para el select)
// ============================================
export async function getBrandsAction() {
    try {
        await verifyAdmin()

        const brands = await db.brand.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        // Convertir BigInt a string
        return {
            success: true,
            data: brands.map(brand => ({
                id: brand.id.toString(),
                name: brand.name
            }))
        }
    } catch (error) {
        console.error("Error al obtener marcas:", error)
        return { success: false, error: "Error al obtener marcas", data: [] }
    }
}

// ============================================
// 6. TOGGLE DISPONIBILIDAD (opcional, útil)
// ============================================
export async function toggleAvailabilityAction(perfumeId: bigint, isAvailable: boolean) {
    try {
        await verifyAdmin()

        await db.perfume.update({
            where: { id: perfumeId },
            data: { isAvailable }
        })

        revalidatePath("/admin")
        return { success: true, message: "Disponibilidad actualizada" }
    } catch (error) {
        console.error("Error al actualizar disponibilidad:", error)
        if (error instanceof Error) {
            return { success: false, error: error.message }
        }
        return { success: false, error: "Error al actualizar disponibilidad" }
    }
}
