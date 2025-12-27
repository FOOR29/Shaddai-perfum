import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { auth } from '@/src/auth'

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
    try {
        // Verificar autenticación de admin
        const session = await auth()
        if (!session?.user || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            )
        }

        // Obtener el archivo del FormData
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No se proporcionó archivo' },
                { status: 400 }
            )
        }

        // Validar tipo de archivo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Formato inválido. Solo JPG, PNG o WEBP' },
                { status: 400 }
            )
        }

        // Validar tamaño (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'La imagen no debe superar los 5MB' },
                { status: 400 }
            )
        }

        // Convertir el archivo a base64
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`

        // Subir a Cloudinary en la carpeta perfumes
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'shaddai-perfumes',  // ✅ Tu carpeta en Cloudinary
            resource_type: 'auto',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [
                { width: 800, height: 800, crop: 'limit' },  // Optimizar tamaño
                { quality: 'auto', fetch_format: 'auto' }
            ]
        })

        return NextResponse.json({
            url: result.secure_url,
            publicId: result.public_id
        })

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error)
        return NextResponse.json(
            { error: 'Error al subir la imagen' },
            { status: 500 }
        )
    }
}
