type ExitBoxProps = {
  hideBox: Function;
  exit: Function;
};

const ExitBox = (props: ExitBoxProps) => {
  return (
    <div
      className="absolute w-full h-full z-20 bg-white/80 flex justify-center"
      onClick={() => props.hideBox()}
    >
      <div className="sm:h-60 sm:w-96 w-80 h-52 mt-52 border-2 border-blue-400 bg-white p-5 flex items-center justify-between flex-col gap-y-2.5 rounded-2xl">
        <h2 className="text-blue-950 my-auto text-xl font-bold">
          Deseja realmente sair?
        </h2>
        <div className="flex items-center justify-center gap-x-2.5">
          <button
            className="text-white bg-blue-400 border-2 border-blue-900 p-1.5 sm:w-40 w-28 rounded-xl font-bold cursor-pointer hover:bg-blue-500 transition-[background-color] duration-500"
            onClick={() => props.hideBox()}
          >
            Cancelar
          </button>
          <button
            className="text-white bg-blue-400 border-2 border-blue-900 p-1.5 sm:w-40 w-28 rounded-xl font-bold cursor-pointer hover:bg-blue-500 transition-[background-color] duration-500"
            onClick={() => props.exit()}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitBox;
