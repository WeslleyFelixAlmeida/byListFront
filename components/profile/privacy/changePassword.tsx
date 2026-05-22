import { useState } from "react";
import { z, ZodError } from "zod";
import { NEXT_API_URL } from "@/utils/apiURL";
import Image from "next/image";
import showImg from "@/public/images/show.png";
import hideImg from "@/public/images/hide.png";
import Loading from "@/components/loading";
import QuestionBox from "../questionBox";

type ChangePasswordProps = {
  setChangePassword: Function;
  setError: Function;
  setSucessMessage: Function;
};

const ChangePassword = (props: ChangePasswordProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showQuestionBox, setShowQuestionBox] = useState<boolean>(false);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const oldPasswordHideSrc = showOldPassword ? showImg : hideImg;
  const newPasswordHideSrc = showNewPassword ? showImg : hideImg;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "oldPassword") {
      setOldPassword(e.target.value);
    }
    if (e.target.id === "newPassword") {
      setNewPassword(e.target.value);
    }
  };

  const changePassword = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`${NEXT_API_URL}/user/update/password`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          newPassword: newPassword,
          oldPassword: oldPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!data.ok) {
        return props.setError(true);
      }

      props.setSucessMessage(true);
      props.setChangePassword(false);
    } catch (error: any) {
      props.setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const checkInput = () => {
    try {
      const passwordsSchema = z.object({
        newPassword: z.string().min(5).max(225),
        oldPassword: z.string().min(1).max(225),
      });

      passwordsSchema.parse({
        newPassword: newPassword,
        oldPassword: oldPassword,
      });

      setShowQuestionBox(true);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return null;
      }
    }
  };

  return (
    <div className="flex items-baseline gap-x-2.5 w-full flex-col gap-y-2.5 relative bg-white p-2.5 rounded-xl border border-blue-500 max-w-80 lg:max-w-115">
      {showQuestionBox && (
        <QuestionBox
          action={changePassword}
          setQuestionBox={setShowQuestionBox}
          type="formsChangeUserData"
        />
      )}
      <div className="flex w-full gap-y-2.5 items-center justify-between">
        <h2 className="font-bold text-xl text-blue-900">Alterar senha</h2>
        <button
          className="bg-red-500 border border-red-500 text-white w-10 h-10 rounded-xl text-2xl cursor-pointer hover:bg-red-600 transition-[background-color] lg:static"
          disabled={isLoading ? true : false}
          onClick={() => props.setChangePassword(false)}
        >
          X
        </button>
      </div>
      <div className="flex flex-col w-full gap-y-2.5 relative">
        <p className="font-bold text-blue-900">Senha antiga:</p>
        <input
          type={showOldPassword ? "text" : "password"}
          name="oldPassword"
          id="oldPassword"
          placeholder="Senha antiga"
          maxLength={225}
          onChange={handleChange}
          value={oldPassword}
          className="p-3 h-10 border rounded-md border-blue-400 shadow focus:outline-blue-950 text-blue-950"
        />
        <button
          type="button"
          onClick={() => setShowOldPassword(!showOldPassword)}
          className="absolute top-11 right-4 opacity-70 cursor-pointer"
        >
          <Image
            src={oldPasswordHideSrc}
            alt="Toggle senha"
            width={20}
            height={20}
            className="w-5 h-auto"
          />
        </button>
        {oldPassword.length < 1 && (
          <div className="font-bold w-full border border-yellow-600 text-yellow-600 bg-yellow-300 rounded-xl p-2 text-center">
            <p>A senha atual deve ser informada para concluir a ação!</p>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-2.5 relative">
        <p className="font-bold text-blue-900">Senha nova:</p>
        <input
          type={showNewPassword ? "text" : "password"}
          name="newPassword"
          id="newPassword"
          placeholder="Senha"
          maxLength={225}
          onChange={handleChange}
          value={newPassword}
          className="p-3 h-10 border rounded-md border-blue-400 shadow focus:outline-blue-950 text-blue-950"
        />
        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute top-11 right-4 opacity-70 cursor-pointer"
        >
          <Image
            src={newPasswordHideSrc}
            alt="Toggle senha"
            width={20}
            height={20}
            className="w-5 h-auto"
          />
        </button>
        {newPassword.length < 5 && (
          <div className="font-bold w-full border border-yellow-600 text-yellow-600 bg-yellow-300 rounded-xl p-2 text-center">
            <p>A senha nova deve ter mais que 5 digitos!</p>
          </div>
        )}

        {!isLoading && (
          <button
            className="bg-blue-500 border border-blue-500 text-whiteh-10 rounded-xl text-xl cursor-pointer hover:bg-blue-600 transition-[background-color] duration-500 ml-auto w-full lg:w-28 h-10 text-white"
            onClick={checkInput}
          >
            Alterar
          </button>
        )}

        {isLoading && (
          <Loading
            width="w-15"
            height="h-15"
            size="text-3xl"
          />
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
