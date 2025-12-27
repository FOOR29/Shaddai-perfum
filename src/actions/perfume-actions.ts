"use server"

import { auth } from "@/src/auth"
import { db } from "@/src/lib/db"
import { PerfumeSchema, UpdatePerfumeSchema } from "@/src/lib/zod"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { v2 as cloudinary } from 'cloudinary'  // ✅ IMPORTAR

// ✅ Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Helper para verificar autenticación de admin
async function verifyAdmin() {
    const session = await auth()
    if (!session || session.user?.role !== 'ADMIN') {
        throw new Error("No autorizado")
    }

    if (!session.user.id) {
        throw new Error("ID de usuario no encontrado en la sesión")
    }

    return session.user
}

// ✅ NUEVO: Helper para eliminar imagen de Cloudinary
async function deleteImageFromCloudinary(publicId: string) {
    try {
        await cloudinary.uploader.destroy(publicId)
        console.log('Imagen eliminada de Cloudinary:', publicId)
    } catch (error) {
        console.error('Error al eliminar imagen de Cloudinary:', error)
        // No lanzar error, solo loguear (la BD se limpia igual)
    }
}

// ============================================
// 1. CREAR PERFUME
// ============================================
export async function createPerfumeAction(values: z.infer<typeof PerfumeSchema>) {
    try {
        const user = await verifyAdmin()

        // Validar con Zod
        const validatedData = PerfumeSchema.parse(values)

        const ownerAdminId = typeof user.id === 'string' ? parseInt(user.id) : Number(user.id)

        if (isNaN(ownerAdminId)) {
            throw new Error(`ID de admin inválido: ${user.id}`)
        }

        // Crear perfume en la BD
        await db.perfume.create({
            data: {
                name: validatedData.name,
                brandId: parseInt(validatedData.brandId),
                gender: validatedData.gender,
                category: validatedData.category,
                description: validatedData.description,
                imageUrl: validatedData.imageUrl,
                imagePublicId: validatedData.imagePublicId || null,  // ✅ NUEVO
                isAvailable: validatedData.isAvailable,
                ownerAdminId: ownerAdminId
            }
        })

        revalidatePath("/admin")
        return { success: true, message: "Perfume creado exitosamente" }
    } catch (error) {
        console.error("Error al crear perfume:", error)
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message }
        }
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

        // ✅ Si cambió la imagen, eliminar la anterior de Cloudinary
        if (perfume.imagePublicId && perfume.imageUrl !== validatedData.imageUrl) {
            await deleteImageFromCloudinary(perfume.imagePublicId)
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
                imagePublicId: validatedData.imagePublicId || null,  // ✅ NUEVO
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

        // ✅ NUEVO: Eliminar imagen de Cloudinary si existe
        if (perfume.imagePublicId) {
            await deleteImageFromCloudinary(perfume.imagePublicId)
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
                ownerAdminId: perfume.ownerAdminId.toString(),
                imagePublicId: perfume.imagePublicId || undefined  // ✅ NUEVO
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
