"use server"
// esto se encarga de poder poder ejecutar el SigIn

import z, { success } from "zod";
import { LoginInSchema } from "../lib/zod";
import { AuthError } from "next-auth";
import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "../auth";


export const loginAction = async (values: z.infer<typeof LoginInSchema>) => {
    try {
        await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false,
        })
        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return { error: "Error 500" }
    }
}