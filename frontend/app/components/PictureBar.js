// import Image from "next/image";

export default function PictureBar({ original, processed }) {
  return (
    <div className="flex rounded-lg h-full w-full text-center flex justify-center w-full">
      <div className="relative rounded-lg h-full mr-6 bg-white bg-opacity-10 w-1/2 ">
        <img
          className="h-full w-full rounded-lg"
          src={original}
          alt="Sample Cyclone"
          // width={180}
          // height={180}
        />
        <div className="absolute text-center p-1 rounded-md w-1/2 z-10 bg-zinc-800 text-zinc-300 top-5 left-1/4 right-1/4">
          ORIGINAL
        </div>
      </div>
      <div className="relative rounded-lg h-full bg-white bg-opacity-10 w-1/2">
        <img
          className="h-full w-full rounded-lg"
          src={processed}
          alt="Sample Cyclone"
          // width={180}
          // height={180}
        />
        <div className="absolute text-center p-1 rounded-md w-1/2 z-10 bg-zinc-800 text-zinc-300 top-5 left-1/4 right-1/4">
          PROCESSED
        </div>
      </div>
    </div>
  );
}
