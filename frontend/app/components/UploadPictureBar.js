// import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadPictureBar({ original, processed, preview }) {
  return (
    <div className="flex rounded-lg h-full w-full text-center flex justify-center w-full overflow-hidden">
      <div className="relative rounded-lg h-full mr-6 bg-white bg-opacity-10 w-1/2 ">
        {original == "/cyclone.jpg" && !preview ? (
          <div
            className="w-full h-full bg-white bg-opacity-10 rounded-lg flex flex-col justify-center text-center opacity-20 hover:opacity-30 transition ease-in-out delay-150"
            onClick={() => {
              toast.warn("Upload An Image First!", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }}
          >
            No Image Uploaded Yet!
          </div>
        ) : (
          <img
            className="h-full w-full rounded-lg"
            src={!preview ? original : URL.createObjectURL(preview)}
            alt="Sample Cyclone"
            // width={180}
            // height={180}
          />
        )}

        <div className="absolute text-center p-1 rounded-md w-1/2 z-10 bg-zinc-800 text-zinc-300 top-5 left-1/4 right-1/4">
          {!preview ? "ORIGINAL" : "IMAGE PREVIEW"}
        </div>
      </div>
      <div className="relative rounded-lg h-full bg-white bg-opacity-10 w-1/2 flex flex-col">
        <div className="rounded-lg bg-white bg-opacity-20 p-2 m-4">
          INSTRUCTIONS
        </div>
        <div className="rounded-lg bg-white bg-opacity-20 px-4 pt-4 mb-4 mx-4 h-full">
          <div className="w-full h-1/4 rounded-lg pb-4">
            <div className="w-full h-full rounded-lg bg-white bg-opacity-10 p-4">
              Firstly ensure that the capture you are going to predict for is an
              image file. The supported formats are jpeg, jpg, and png.
            </div>
          </div>
          <div className="w-full h-1/4 rounded-lg pb-4">
            <div className="w-full h-full rounded-lg bg-white bg-opacity-10 p-4">
              Check that the region your image covers is supported for
              prediction in the checker given below.
            </div>
          </div>
          <div className="w-full h-1/4 rounded-lg pb-4">
            <div className="w-full h-full rounded-lg bg-white bg-opacity-10 p-4">
              Select your image in the dialog box that pops on clicking the
              corresponding button.
            </div>
          </div>
          <div className="w-full h-1/4 rounded-lg pb-4">
            <div className="w-full h-full rounded-lg bg-white bg-opacity-10 p-4">
              Once you've picked the image of your choice, click on the adjacent
              Upload button to send the image for prediction.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
