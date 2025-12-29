import { DefaultSession } from "next-auth";
import "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;       // ✅ AGREGAR ESTO
            role?: string;
        } & DefaultSession["user"]
    }

    interface User {
        id?: string;           // ✅ AGREGAR ESTO
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;           // ✅ AGREGAR ESTO
        role?: string;
    }
}
