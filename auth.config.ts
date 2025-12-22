import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginInSchema } from "./src/lib/zod";
import { db } from "@/src/lib/db";
import bcrypt from "bcryptjs";  // se debe instalar eso para hasear la contraseña: npm i bcryptjs
import { nanoid } from "nanoid";  // esto se instala como "npm i nanoid"  esto genera id y sirve para la configuracion de verificar el correo

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({
            authorize: async (credentials) => {
                // aca se validan que los datos que se manda como el email y las contraseña son correctos
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
                const isvalid = await bcrypt.compare(data.password, user.passwordHash) // se compara la contraseña de la base de datos con la ingresada

                if (!isvalid) {
                    throw new Error("Contraseña incorrecta")
                }

                // aca se convierte de id a string
                return {
                    id: user.id.toString(), // nexy auth requiere string
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role
                }
            },
        }),
    ],
} satisfies NextAuthConfig