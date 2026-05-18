"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import showImg from "@/public/images/show.png";
import hideImg from "@/public/images/hide.png";
import Link from "next/link";
import { NEXT_API_URL } from "@/utils/apiURL";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
import { VscLoading } from "react-icons/vsc";

const Login = () => {
  const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [alertMessageWrongData, setAlertMessageWrongData] =
    useState<boolean>(false);
  const router = useRouter();
  const passwordHideSrc = showPassword ? showImg : hideImg;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  function handleFormInputs(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }

    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const validation = loginSchema.parse({
        email: email,
        password: password,
      });

      auth({ email: email, password: password });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return setAlertMessageWrongData(true);
      }

      setErrorMessage(true);
    }
  }

  const auth = async (data: { email: string; password: string }) => {
    setIsloading(true);

    const request = await fetch(`${NEXT_API_URL}/user/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!request.ok) {
      return setErrorMessage(true);
    }

    router.push("/profile");
  };

  useEffect(() => {
    if (errorMessage || alertMessageWrongData) {
      setIsloading(false);
      setTimeout(() => setErrorMessage(false), 3000);
    }

    if (alertMessageWrongData) {
      setIsloading(false);
      setTimeout(() => setAlertMessageWrongData(false), 3000);
    }
  }, [errorMessage, alertMessageWrongData]);

  return (
    <section className="min-h-screen bg-gray-200 w-full flex items-center justify-center bg-linear-to-b from-gray-100 via-gray-200 to-slate-200">
      <form
        onSubmit={handleSubmit}
        className={`w-96 border-2 border-blue-400 rounded-xl bg-white px-10 py-5 box-border flex items-center flex-col gap-x-2.5 space-y-5 overflow-hidden ${errorMessage || alertMessageWrongData ? "h-125" : "h-110"} transition-[height, overflow] duration-500`}
      >
        <h1 className="text-3xl font-bold text-blue-900 mt-1.5 mb-1.5">
          Login
        </h1>

        <div className="flex flex-col w-full gap-y-2.5">
          <p className="font-bold text-blue-900">E-mail:</p>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={handleFormInputs}
            value={email}
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
            onChange={handleFormInputs}
            value={password}
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
          {!isLoading && (
            <input
              type="submit"
              value="Entrar"
              className="cursor-pointer w-full bg-blue-700 p-3 text-white"
            />
          )}
          {isLoading && (
            <div className="w-1/2 p-3 text-blue-700 flex items-center justify-center gap-x-2.5 m-auto">
              <p className="font-bold">Aguarde</p>
              <VscLoading className="animate-spin text-3xl" />
            </div>
          )}

          <p className="text-sm text-blue-950">
            Não possui conta?{" "}
            <Link
              href={"/register"}
              className="text-blue-500 hover:underline"
            >
              Criar conta
            </Link>
          </p>

          <p className="text-sm text-blue-950">
            Esqueceu sua senha?{" "}
            <Link
              // href={"/password-recover"}
              href={"#"}
              className="text-blue-500 hover:underline"
            >
              Recuperar senha
            </Link>
          </p>
        </div>
        {errorMessage && (
          <div className="w-full text-white bg-red-600 rounded-xl p-2.5 text-center">
            <p>Email ou senha incorretos, verifique e tente novamente.</p>
          </div>
        )}

        {alertMessageWrongData && (
          <div className="w-full text-white bg-yellow-600 rounded-xl p-2.5 text-center">
            <p>Há campos vazios ou dados inválidos</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Login;
