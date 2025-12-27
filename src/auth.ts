import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    ...authConfig,
    session: { strategy: "jwt" },

    callbacks: {
        // ✅ CORREGIDO: Agregar el ID al token
        jwt({ token, user }) {
            if (user) {
                token.id = user.id  // ✅ AGREGAR ESTO
                token.role = user.role
            }
            return token
        },
        // ✅ CORREGIDO: Pasar el ID a la sesión
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string  // ✅ AGREGAR ESTO
                session.user.role = token.role
            }
            return session
        },
    },
})
