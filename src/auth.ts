import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "@/auth.config";


export const { handlers, signIn, signOut, auth } = NextAuth({
    // le pasamos el adaptador de prisma
    adapter: PrismaAdapter(db),
    ...authConfig, // se destructura el authconfig
    session: { strategy: "jwt" },

    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.role = user.role;
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.role = token.role
            }
            return session
        },
    },
})