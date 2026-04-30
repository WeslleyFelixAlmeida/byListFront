"use client";

import Image from "next/image";
import { useState } from "react";
import showImg from "@/public/images/show.png";
import hideImg from "@/public/images/hide.png";
import Link from "next/link";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    const passwordHideSrc = showPassword ? showImg : hideImg;

    return (
        <section className="min-h-screen bg-gray-200 w-full flex items-center justify-center bg-linear-to-b from-gray-100 via-gray-200 to-slate-200">
            <form
                onSubmit={handleSubmit}
                className="w-96 border-2 border-blue-400 rounded-xl bg-white px-10 py-5 box-border flex items-center flex-col gap-x-2.5 space-y-5"
            >
                <h1 className="text-3xl font-bold text-blue-900 mt-1.5 mb-1.5">
                    Login
                </h1>

                <div className="flex flex-col w-full gap-y-2.5">
                    <p className="font-bold text-blue-900">Usuário:</p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Usuário"
                        maxLength={225}
                        className="p-3 h-10 border rounded-md border-blue-400 shadow focus:outline-blue-950 text-blue-950"
                    />
                </div>

                <div className="flex flex-col w-full gap-y-2.5 relative">
                    <p className="font-bold text-blue-900">Senha:</p>

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Senha"
                        maxLength={225}
                        className="p-3 h-10 border rounded-md border-blue-400 shadow focus:outline-blue-950 text-blue-950"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-11 right-4 opacity-70 cursor-pointer"
                    >
                        <Image
                            src={passwordHideSrc}
                            alt="Toggle senha"
                            width={20}
                            height={20}
                            className="w-5 h-auto"
                        />

                    </button>
                </div>

                <div className="w-full flex flex-col gap-y-1.5 space-y-2.5 pb-5">
                    <input
                        type="submit"
                        value="Entrar"
                        className="cursor-pointer w-full bg-blue-700 p-3 text-white"
                    />

                    <p className="text-sm text-blue-950">
                        Não possui conta?{" "}
                        <Link href={"/register"} className="text-blue-500 hover:underline">
                            Criar conta
                        </Link>
                    </p>

                    <p className="text-sm text-blue-950">
                        Esqueceu sua senha?{" "}
                        <Link
                            // href={"/password-recover"}
                            href={"#"}
                            className="text-blue-500 hover:underline">
                            Recuperar senha
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    );
}

export default Login;