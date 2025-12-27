"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { z } from "zod"
import { PerfumeSchema } from "@/src/lib/zod"
import { createPerfumeAction, updatePerfumeAction } from "@/src/actions/perfume-actions"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { IoImageOutline, IoCloudUploadOutline } from "react-icons/io5"

type PerfumeFormData = z.infer<typeof PerfumeSchema>

type PerfumeFormProps = {
    mode: "create" | "edit"
    perfume?: {
        id: string
        name: string
        brandId: string
        gender: "MASCULINO" | "FEMENINO" | "UNISEX"
        category: "ONE_ONE" | "PREPARADO"
        description: string
        imageUrl: string
        isAvailable: boolean
    }
    brands: { id: string; name: string }[]
}

const PerfumeForm = ({ mode, perfume, brands }: PerfumeFormProps) => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<PerfumeFormData>({
        resolver: zodResolver(PerfumeSchema),
        defaultValues: perfume || {
            name: "",
            brandId: "",
            gender: "MASCULINO",
            category: "ONE_ONE",
            description: "",
            imageUrl: "",
            isAvailable: true
        }
    })

    const imageUrl = watch("imageUrl")
    const isAvailable = watch("isAvailable")

    // ✅ NUEVO: Función para subir imagen a Cloudinary
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validar tipo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) {
            setError('Formato inválido. Solo JPG, PNG o WEBP')
            return
        }

        // Validar tamaño (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('La imagen no debe superar los 5MB')
            return
        }

        setIsUploadingImage(true)
        setError(null)
        setUploadSuccess(false)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload/perfume', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error al subir la imagen')
            }

            // ✅ Establecer la URL en el formulario
            setValue('imageUrl', data.url, { shouldValidate: true })
            setUploadSuccess(true)

            // Quitar mensaje de éxito después de 3 segundos
            setTimeout(() => setUploadSuccess(false), 3000)

        } catch (error) {
            console.error('Error uploading image:', error)
            setError(error instanceof Error ? error.message : 'Error al subir la imagen')
        } finally {
            setIsUploadingImage(false)
        }
    }

    async function onSubmit(values: PerfumeFormData) {
        setError(null)
        startTransition(async () => {
            let result

            if (mode === "create") {
                result = await createPerfumeAction(values)
            } else {
                result = await updatePerfumeAction({
                    ...values,
                    id: perfume!.id
                })
            }

            if (result.success) {
                router.push("/admin")
                router.refresh()
            } else {
                setError(result.error || "Error al guardar")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* ✅ NUEVO: Upload de imagen */}
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6">
                <div className="flex flex-col items-center">
                    {/* Preview de imagen */}
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg mb-3"
                        />
                    ) : (
                        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                            <IoImageOutline className="w-12 h-12 text-gray-400" />
                        </div>
                    )}

                    {/* Botón de upload */}
                    <label
                        htmlFor="file-upload"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${isUploadingImage
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-cta hover:bg-cta-hover text-white'
                            }`}
                    >
                        {isUploadingImage ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Subiendo...
                            </>
                        ) : (
                            <>
                                <IoCloudUploadOutline className="w-5 h-5" />
                                {imageUrl ? 'Cambiar imagen' : 'Subir imagen'}
                            </>
                        )}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isUploadingImage}
                    />

                    <p className="text-xs text-subtitulo mt-2">
                        JPG, PNG o WEBP (máx. 5MB)
                    </p>

                    {/* Mensaje de éxito */}
                    {uploadSuccess && (
                        <p className="text-sm text-green-600 font-semibold mt-2">
                            ✅ Imagen subida correctamente
                        </p>
                    )}
                </div>
            </div>

            {/* Campo oculto para la URL (la setea handleImageUpload) */}
            <input type="hidden" {...register("imageUrl")} />
            {errors.imageUrl && (
                <p className="text-xs text-red-500 text-center -mt-3">{errors.imageUrl.message}</p>
            )}

            {/* Nombre */}
            <div>
                <label className="block text-sm font-semibold text-titular mb-2">
                    Perfume Name
                </label>
                <Input
                    placeholder="Ej: Chanel No. 5"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Marca */}
            <div>
                <label className="block text-sm font-semibold text-titular mb-2">
                    Brand
                </label>
                <select
                    {...register("brandId")}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta ${errors.brandId ? "border-red-500" : "border-gray-200"
                        }`}
                >
                    <option value="">Selecciona una marca</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                {errors.brandId && (
                    <p className="text-xs text-red-500 mt-1">{errors.brandId.message}</p>
                )}
            </div>

            {/* Categoría */}
            <div>
                <label className="block text-sm font-semibold text-titular mb-2">
                    Category
                </label>
                <select
                    {...register("category")}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta ${errors.category ? "border-red-500" : "border-gray-200"
                        }`}
                >
                    <option value="ONE_ONE">1:1 (Original)</option>
                    <option value="PREPARADO">Preparado</option>
                </select>
                {errors.category && (
                    <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
                )}
            </div>

            {/* Género */}
            <div>
                <label className="block text-sm font-semibold text-titular mb-3">
                    Gender
                </label>
                <div className="space-y-2">
                    {[
                        { value: "MASCULINO", label: "Masculino" },
                        { value: "FEMENINO", label: "Femenino" },
                        { value: "UNISEX", label: "Unisex" }
                    ].map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <input
                                type="radio"
                                value={option.value}
                                {...register("gender")}
                                className="w-5 h-5 text-cta focus:ring-cta"
                            />
                            <span className="text-sm font-medium text-titular">
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
                {errors.gender && (
                    <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
                )}
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-sm font-semibold text-titular mb-2">
                    Description
                </label>
                <textarea
                    {...register("description")}
                    placeholder="Describe el perfume..."
                    rows={4}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-cta resize-none ${errors.description ? "border-red-500" : "border-gray-200"
                        }`}
                />
                {errors.description && (
                    <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
                )}
            </div>

            {/* Toggle de disponibilidad */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-titular text-sm mb-1">
                            Showroom Status
                        </p>
                        <p className="text-xs text-subtitulo">
                            Disponible para mostrar en el catálogo
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            {...register("isAvailable")}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cta/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cta"></div>
                    </label>
                </div>
            </div>

            {/* Error general */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-sm font-medium text-red-600 text-center">{error}</p>
                </div>
            )}

            {/* Botones */}
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
                <Button
                    type="submit"
                    disabled={isPending || isUploadingImage}
                    className="flex-1 primary py-3"
                >
                    {isPending ? "Guardando..." : mode === "create" ? "Create Perfume" : "Save Changes"}
                </Button>
            </div>
        </form>
    )
}

export default PerfumeForm
