import { User } from "@/types/userType";
import { FaRegTrashAlt } from "react-icons/fa";

const Privacy = (props: User) => {
  return (
    <div className="text-blue-900 space-y-8 h-full w-full p-8">
      <h1 className="font-bold text-3xl">Altere suas informações</h1>
      <div className="flex flex-col gap-y-2.5">
        <p className="font-bold">Nome do usuário</p>
        <button className="text-white bg-blue-500 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-blue-600 transition-[background-color] duration-500 w-fit">
          Alterar nome de usuário
        </button>
      </div>
      <div className="flex flex-col gap-y-2.5">
        <p className="font-bold">Altere sua senha:</p>
        <button className="text-white bg-blue-500 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-blue-600 transition-[background-color] duration-500 w-fit">
          Alterar senha
        </button>
      </div>
      <div className="flex flex-col gap-y-2.5">
        <p className="font-bold">Deletar conta?</p>
        <button className="text-white bg-red-600 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-red-700 transition-[background-color] duration-500 w-fit">
          Deletar conta <FaRegTrashAlt />
        </button>
        <p className="text-red-600">
          *Cuidado esta ação não pode ser desfeita!
        </p>
      </div>
    </div>
  );
};

export default Privacy;
