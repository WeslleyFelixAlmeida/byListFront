"use client";
import { useState } from "react";
import { z, ZodError } from "zod";
import { NEXT_API_URL } from "@/utils/apiURL";
import Loading from "@/components/loading";
import QuestionBox from "../questionBox";

type ChangeUsernameProps = {
  setChangeUsername: Function;
  setUsername: Function;
  setError: Function;
  setSucessMessage: Function;
};

const ChangeUsername = (props: ChangeUsernameProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showQuestionBox, setShowQuestionBox] = useState<boolean>(false);

  const [newUsername, setNewUsername] = useState<string>("");

  const changeUsername = async () => {
    try {
      setIsLoading(true);

      const data = await fetch(`${NEXT_API_URL}/user/update/username`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({ username: newUsername }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!data.ok) {
        return props.setError(true);
      }

      props.setUsername(newUsername);
      props.setSucessMessage(true);
      props.setChangeUsername(false);
    } catch (error: any) {
      props.setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "newUsername") {
      setNewUsername(e.target.value);
    }
  };

  const checkInput = () => {
    try {
      const usernameSchema = z.string().min(5);
      usernameSchema.parse(newUsername);

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
          action={changeUsername}
          setQuestionBox={setShowQuestionBox}
          type="formsChangeUserData"
        />
      )}
      <p className="font-bold text-xl text-blue-900">Novo nome de usuario:</p>

      <input
        type="text"
        name="newUsername"
        id="newUsername"
        placeholder="Novo nome de usuário"
        className="text-blue-950 border border-blue-500 h-10 rounded-xl flex items-center justify-center gap-x-1.5 font-bold box-border pt-0.5 outline-blue-500 px-3 w-full"
        value={newUsername}
        onChange={handleChange}
      />
      <button
        disabled={isLoading ? true : false}
        className="bg-red-500 border border-red-500 text-white w-10 h-10 rounded-xl text-2xl cursor-pointer hover:bg-red-600 transition-[background-color] absolute right-3 top-1"
        onClick={() => props.setChangeUsername(false)}
      >
        X
      </button>

      {newUsername.length < 5 && (
        <div className="font-bold w-full border border-yellow-600 text-yellow-600 bg-yellow-300 rounded-xl p-2 text-center">
          <p>O nome de usuário dever ter ao menos 5 caractéres!</p>
        </div>
      )}

      {!isLoading && (
        <button
          className="bg-blue-500 border border-blue-500 rounded-xl text-xl cursor-pointer hover:bg-blue-600 transition-[background-color] duration-500 mx-auto w-full self-end lg:w-28 h-10 text-white"
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
  );
};

export default ChangeUsername;
