import { VscLoading } from "react-icons/vsc";
type LoadingProps = {
  height?: string;
  width?: string;
  size?: string;
};

const Loading = (props: LoadingProps) => {
  const height = props.height || "w-full";
  const width = props.width || "h-dvh";
  const size = props.size || "text-9xl";
  return (
    <div
      className={`${height} ${width} ${size}
        text-blue-700 bg-white flex items-center justify-center m-auto`}
    >
      <VscLoading className="animate-spin" />
    </div>
  );
};

export default Loading;
