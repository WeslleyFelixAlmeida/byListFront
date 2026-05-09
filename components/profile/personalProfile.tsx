import { CgProfile } from "react-icons/cg";
import type { User } from "@/types/userType";

type PersonalProfileProps = {
  user: User;
  changePage: Function;
};

const PersonalProfile = (props: PersonalProfileProps) => {
  const user = props.user;
  const changePage = props.changePage;
  return (
    <div className="text-blue-900 flex flex-col gap-y-5 w-full max-w-4xl h-full items-center p-15">
      <h1 className="text-3xl font-bold">Olá, {user.username}</h1>
      <p className="text-xl mt-5">Veja as informações do seu perfil</p>
      <CgProfile className="text-[150px]" />
      <h2 className="text-3xl font-bold">{user.username}</h2>
      <p className="text-xl self-start font-bold mt-5">
        Acesse e altere informações:
      </p>

      <div className="flex flex-wrap w-full space-x-5 gap-y-2.5 self-start">
        <button
          onClick={(e) => {
            e.stopPropagation();
            changePage("privacy");
          }}
          className="w-fit px-3 h-9 rounded-lg bg-blue-500 border border-blue-400 font-bold text-white cursor-pointer transition-[background-color] duration-500 hover:bg-blue-600"
        >
          Alterar senha
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            changePage("privacy");
          }}
          className="w-fit px-3 h-9 rounded-lg bg-blue-500 border border-blue-400 font-bold text-white cursor-pointer transition-[background-color] duration-500 hover:bg-blue-600"
        >
          Alterar nome de usuário
        </button>
      </div>
    </div>
  );
};
export default PersonalProfile;
