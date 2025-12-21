import z from "zod";


// login esquema
export const LoginInSchema = z.object({
    username: z
        .string()
        .min(1, "El usuario es requerido")
        //esto es para validaciones personalizadas
        .refine((val) => /^[a-zA-Z0-9_]+$/.test(val), {
            message: "Usuario inválido. Solo letras, números y guión bajo"
        }),
    password: z
        .string()
        .min(1, "La contraseña es requerida")
        .min(8, "Ingresa al menos 8 caracteres")
        .max(20, "Excediste el numero de caracteres!")
})