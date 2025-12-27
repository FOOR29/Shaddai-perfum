import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginInSchema } from "./src/lib/zod";
import { db } from "@/src/lib/db";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const { data, success } = LoginInSchema.safeParse(credentials);
                if (!success) {
                    throw new Error("Credenciales invalidas")
                }
                // verificar si el usuario existe en la base de datos
                const user = await db.adminUser.findUnique({
                    where: {
                        username: data.username,
                    }
                });

                if (!user || !user.passwordHash) {
                    throw new Error("Usuario no encontrado")
                }

                // verificar si la contraseña es correcta
                const isvalid = await bcrypt.compare(data.password, user.passwordHash)

                if (!isvalid) {
                    throw new Error("Contraseña incorrecta")
                }

                // aca se convierte de id a string
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role
                }
            },
        }),
    ],
} satisfies NextAuthConfig