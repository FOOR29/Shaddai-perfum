import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { NextResponse } from "next/server"

const { auth: middleware } = NextAuth(authConfig)

const publicRoutes = [
    "/",
    "/login",
    // "/error" esta es opcional
]

export default middleware((req) => {
    const { nextUrl, auth } = req
    const isLoggedIn = !!auth?.user

    const isPublicRoute =
        publicRoutes.includes(nextUrl.pathname) ||
        nextUrl.pathname.startsWith("/perfum/")

    // Proteger las rutas (solo si NO es pública y NO está logueado)
    if (!isPublicRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl))
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
