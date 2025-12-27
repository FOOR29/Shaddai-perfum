'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { startTransition, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import z from "zod"
import { LoginInSchema } from "@/src/lib/zod"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { loginAction } from "@/src/actions/auth-actions"
import { FaUserTie } from "react-icons/fa"
import { GiPadlock } from "react-icons/gi"
import { IoArrowBack } from "react-icons/io5"

const LoginForm = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isPending, SetIsPending] = useTransition()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof LoginInSchema>>({
        resolver: zodResolver(LoginInSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    async function onSubmit(values: z.infer<typeof LoginInSchema>) {
        setError(null)
        startTransition(async () => {
            const response = await loginAction(values)
            console.log(response)
            if (response.error) {
                setError(response.error)
            } else {
                router.push("/admin")
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center w-80">
            {/* Botón volver - Posición absoluta arriba izquierda */}
            <Link
                href="/"
                className="absolute top-4 left-4 inline-flex items-center gap-2 text-subtitulo hover:text-titular transition-colors font-semibold z-10"
            >
                <IoArrowBack className="w-5 h-5" />
                <span className="">Volver al inicio</span>
            </Link>

            {/* Card del formulario - Centrado */}
            <div className="w-full max-w-md">
                <div>
                    {/* Logo */}
                    <div className="flex justify-center mb-3">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-cta rounded-2xl flex items-center justify-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-white rounded-full flex items-center justify-center">
                                <div className="w-2 h-4 border-b-4 border-r-4 border-white rotate-45 -mt-1"></div>
                            </div>
                        </div>
                    </div>

                    {/* Título */}
                    <div className="text-center mb-6">
                        <h1 className="text-xl sm:text-2xl font-extrabold text-titular mb-1">
                            Shaddai Perfum
                        </h1>
                        <p className="text-subtitulo text-xs sm:text-sm font-semibold">
                            Admin Portal
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Campo Username */}
                        <div>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                    <FaUserTie className="w-5 h-5 text-subtitulo" />
                                </div>
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    className={`pl-12 ${errors.username ? "border-red-500" : ""}`}
                                    {...register("username")}
                                />
                            </div>
                            {errors.username && (
                                <p className="text-xs sm:text-sm font-medium text-red-500 mt-1.5 ml-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Campo Password */}
                        <div>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                    <GiPadlock className="w-5 h-5 text-subtitulo" />
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className={`pl-12 ${errors.password ? "border-red-500" : ""}`}
                                    {...register("password")}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs sm:text-sm font-medium text-red-500 mt-1.5 ml-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Error general */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                                <p className="text-xs sm:text-sm font-medium text-red-600 text-center">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Botón Submit */}
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full primary text-base sm:text-lg font-bold py-2.5 sm:py-3"
                        >
                            {isPending ? "Cargando..." : "Login"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
