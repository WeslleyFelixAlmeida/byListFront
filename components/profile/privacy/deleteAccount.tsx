"use client";

import { useState } from "react";
import showImg from "@/public/images/show.png";
import hideImg from "@/public/images/hide.png";
import Image from "next/image";
import { z, ZodError } from "zod";
import { NEXT_API_URL } from "@/utils/apiURL";
import { useRouter } from "next/navigation";
import QuestionBox from "../questionBox";
import Loading from "@/components/loading";

type DeleteAccountProps = {
  setDeleteAccount: Function;
  setError: Function;
};

const DeleteAccount = (props: DeleteAccountProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSucessMessage] = useState<boolean>(false);
  const [showQuestionBox, setShowQuestionBox] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const passwordHideSrc = showPassword ? showImg : hideImg;
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const deleteAcc = async () => {
    try {
      setIsLoading(true);

      const data = await fetch(`${NEXT_API_URL}/user/delete`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({ password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!data.ok) {
        return props.setError(true);
      }

      router.push("/login?deleteAccount=true");
    } catch (error: any) {
      props.setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const checkInput = () => {
    try {
      const passwordsSchema = z.string().min(5);
      passwordsSchema.parse(password);

      setShowQuestionBox(true);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return null;
      }
    }
  };

  return (
    <div className="flex items-baseline gap-x-2.5 w-full flex-col gap-y-2.5 relative bg-white p-2.5 rounded-xl border border-red-600 max-w-80 lg:max-w-115">
      {showQuestionBox && (
        <QuestionBox
          action={deleteAcc}
          setQuestionBox={setShowQuestionBox}
          type="formsChangeUserData"
        />
      )}

      <div className="flex flex-col w-full gap-y-2.5">
        <div className="flex w-full gap-y-2.5 items-center justify-between">
          <h2 className="font-bold text-xl text-red-600">Deletar conta</h2>
          <button
            className="bg-red-500 border border-red-500 text-white w-10 h-10 rounded-xl text-2xl cursor-pointer hover:bg-red-600 transition-[background-color] lg:static"
            disabled={isLoading ? true : false}
            onClick={() => props.setDeleteAccount(false)}
          >
            X
          </button>
        </div>
        <div className="flex flex-col w-full gap-y-2.5 relative">
          {!isLoading && <p className="font-bold text-red-600">Senha:</p>}
          {!isLoading && (
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Informe sua senha"
              maxLength={225}
              onChange={handleChange}
              value={password}
              className="p-3 h-10 border rounded-md border-blue-400 shadow focus:outline-blue-950 text-blue-950"
            />
          )}

          {!isLoading && (
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
          )}
          {password.length < 1 && (
            <div className="font-bold w-full border border-yellow-600 text-yellow-600 bg-yellow-300 rounded-xl p-2 text-center">
              <p>A senha deve ser informada para concluir a ação!</p>
            </div>
          )}
        </div>
        {!isLoading && (
          <button
            className="bg-red-600 text-white font-bold border border-red-700 rounded-xl p-2.5 cursor-pointer hover:bg-red-700 transition-[background-color] duration-500"
            onClick={checkInput}
          >
            Deletar conta
          </button>
        )}
      </div>

      {isLoading && (
        <p className="font-bold text-xl text-center w-full">Aguarde</p>
      )}
      {isLoading && (
        <Loading
          width="w-15"
          height="h-15"
          size="text-3xl"
        />
      )}
    </div>
  );
};
export default DeleteAccount;
