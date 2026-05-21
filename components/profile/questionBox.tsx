type QuestionBoxProps = {
  setQuestionBox: Function;
  action: Function;
  type?: "fullScreen" | "formsChangeUserData";
};

const QuestionBox = (props: QuestionBoxProps) => {
  if (props.type === "formsChangeUserData") {
    return (
      <div className="w-full h-full bg-white absolute top-0 left-0 z-10 flex items-center flex-col justify-center p-2.5 gap-y-2.5 rounded-xl">
          <p className="font-bold text-xl text-red-600 self-center">
            Você tem certeza que deseja prosseguir?
          </p>
          <div className="flex items-center gap-x-2.5">
            <button
              className="text-white bg-blue-500 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-blue-600 transition-[background-color] duration-500 w-fit"
              onClick={() => props.setQuestionBox(false)}
            >
              Cancelar
            </button>
            <button
              className="text-white bg-blue-500 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-blue-600 transition-[background-color] duration-500 w-fit"
              onClick={() => props.action()}
            >
              Confirmar
            </button>
          </div>
      </div>
    );
  }

  return (
    <div className="absolute w-dvw h-dvh flex justify-center">
      <div className="flex items-center flex-col justify-between w-3xs lg:w-80 p-2.5 box-border min-h-full min-w-full">
        <p className="font-bold text-2xl text-red-600">
          Você tem certeza que deseja prosseguir?
        </p>
        <div className="flex gap-y-2.5 grow">
          <button
            className="text-white bg-blue-500 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-blue-600 transition-[background-color] duration-500 w-fit"
            onClick={() => props.setQuestionBox(false)}
          >
            Cancelar
          </button>
          <button
            className="text-white bg-blue-500 cursor-pointer flex items-center justify-center gap-y-2.5 rounded-lg p-1.5 hover:bg-blue-600 transition-[background-color] duration-500 w-fit"
            onClick={() => props.action()}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuestionBox;
