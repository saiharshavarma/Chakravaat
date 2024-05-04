import CircularProgress from "@mui/material/CircularProgress";

export default function HelperMessageLoader() {
  return (
    <div className="flex bg-white bg-opacity-15 rounded-lg p-2 w-full justify-center mt-4 h-20">
      <div className="mr-4 h-full flex flex-col justify-center">
        Chakravaat is responding . . . . .
      </div>
      <div className="h-full flex flex-col justify-center">
        <CircularProgress sx={{ color: "white" }} />
      </div>
    </div>
  );
}
