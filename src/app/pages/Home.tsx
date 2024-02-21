import { Link } from "@tanstack/react-router";

export const Home = () => {
  return (
    <div className="bg-blue-300 font-bold w-screen h-screen flex flex-col justify-center items-center ">
      <p className="mb-4 text-white text-6xl">Hello, world!</p>
      <p>
        <Link
          className={"font-normal text-blue-800 underline"}
          to={"/forecast"}
        >
          View forecast
        </Link>
      </p>
    </div>
  );
};
