export default function ArchiveAccess({ setText }) {
  return (
    <div className="flex h-full">
      <img
        src="/archive-access/archive-navbar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "Use the navigation bar to move around to different pages and get help! We're currently on the archive's page!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <img
        src="/archive-access/archive-sidebar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "Pick any date and time you want to get data for cyclonic events! Get basic info about the presence of a cyclone below!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <div className="flex flex-col w-full">
        <img
          src="/archive-access/archive-midbar.png"
          className="w-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "Check out the trend of data around the selected date and time! View the original satellite capture for it on the left!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
        <img
          src="/archive-access/archive-lowbar.png"
          className="w-full h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "This is where all the predictions for the selected date and time are displayed! Click on them to change their units, get info about the category, and get info in depth about it!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
      </div>
    </div>
  );
}
