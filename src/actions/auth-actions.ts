"use server"

import z, { success } from "zod";
import { LoginInSchema } from "../lib/zod";
import { AuthError } from "next-auth";
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