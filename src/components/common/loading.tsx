import SquareLoader from "react-spinners/SquareLoader";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[calc(100%-160px)] h-full block fixed bg-black/20 z-[9999]">
      <SquareLoader color="#60a5fa" loading={true} className="mx-auto" />
    </div>
  );
};
export default Loading;
