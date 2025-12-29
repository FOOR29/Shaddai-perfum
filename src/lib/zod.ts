import z from "zod";

// login esquema
export const LoginInSchema = z.object({
    username: z
        .string()
        .min(1, "El usuario es requerido")
        .refine((val) => /^[a-zA-Z0-9_]+$/.test(val), {
            message: "Usuario inválido. Solo letras, números y guión bajo"
        }),
    password: z
        .string()
        .min(1, "La contraseña es requerida")
        .min(8, "Ingresa al menos 8 caracteres")
        .max(20, "Excediste el numero de caracteres!")
})

// Schema para crear/editar perfume
export const PerfumeSchema = z.object({
    name: z.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(160, "El nombre no puede exceder 160 caracteres"),

    brandId: z.string()
        .min(1, "Debes seleccionar una marca"),

    gender: z.enum(["MASCULINO", "FEMENINO", "UNISEX"]),

    category: z.enum(["ONE_ONE", "PREPARADO"]),

    description: z.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede exceder 500 caracteres"),

    imageUrl: z.string()
        .url("Debe ser una URL válida")
        .min(1, "La imagen es obligatoria"),

    imagePublicId: z.string().optional(),  // ✅ NUEVO

    isAvailable: z.boolean()
})

// Schema para editar (incluye el ID)
export const UpdatePerfumeSchema = PerfumeSchema.extend({
    id: z.string()
})
