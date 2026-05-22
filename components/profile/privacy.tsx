"use client";
import { User } from "@/types/userType";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import DeleteAccount from "./privacy/deleteAccount";
import ChangePassword from "./privacy/changePassword";
import ChangeUsername from "./privacy/changeUsername";

const Privacy = (props: User) => {
  const [username, setUsername] = useState<string>(props.name);
  const [showChangeUsername, setShowChangeUsername] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (showSuccessMessage) {
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }

    if (error) {
      setTimeout(() => setError(false), 3000);
    }
  }, [showSuccessMessage, error]);

  return (
    <div className="text-blue-900 space-y-8 h-full w-full p-8 relative">
      {error && (
        <div className="font-bold w-60 lg:w-96 border border-red-600 text-white bg-red-400 rounded-xl absolute">
          <p>Ocorreu um erro ao realizar operação</p>
        </div>
      )}
      <h1 className="font-bold text-3xl">Altere suas informações:</h1>

      {showSuccessMessage && (
        <div className="font-bold w-60 lg:w-96 border border-green-600 text-white bg-green-400 rounded-xl absolute p-2.5 left-1/2 -translate-1/2 top-12 flex justify-center items-center text-center">
          <p>Ação realizada com sucesso!</p>
        </div>
      )}

      {!showChangeUsername && (
        <div className="flex flex-col gap-y-2.5">
          <p className="font-bold text-xl">Nome de usuário:</p>
          <p className="font-bold text-blue-950">{username}</p>
          <button
            className="text-white bg-blue-500 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-blue-600 transition-[background-color] duration-500 w-fit"
            onClick={() => setShowChangeUsername(true)}
          >
            Alterar nome de usuário
          </button>
        </div>
      )}

      {showChangeUsername && (
        <ChangeUsername
          setChangeUsername={setShowChangeUsername}
          setUsername={setUsername}
          setError={setError}
          setSucessMessage={setShowSuccessMessage}
        />
      )}

      {!showChangePassword && (
        <div className="flex flex-col gap-y-2.5">
          <p className="font-bold text-xl">Altere sua senha:</p>
          <button
            className="text-white bg-blue-500 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-blue-600 transition-[background-color] duration-500 w-fit"
            onClick={() => setShowChangePassword(true)}
          >
            Alterar senha
          </button>
        </div>
      )}

      {showChangePassword && (
        <ChangePassword
          setChangePassword={setShowChangePassword}
          setError={setError}
          setSucessMessage={setShowSuccessMessage}
        />
      )}

      {!showDeleteAccount && (
        <div className="flex flex-col gap-y-2.5">
          <p className="font-bold text-xl">Deletar conta?</p>
          <button
            className="text-white bg-red-600 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-red-700 transition-[background-color] duration-500 w-fit"
            onClick={() => setShowDeleteAccount(true)}
          >
            Deletar conta <FaRegTrashAlt />
          </button>
          <p className="text-red-600">
            *Cuidado esta ação não pode ser desfeita!
          </p>
        </div>
      )}

      {showDeleteAccount && (
        <DeleteAccount
          setDeleteAccount={setShowDeleteAccount}
          setError={setError}
        />
      )}
    </div>
  );
};

export default Privacy;
