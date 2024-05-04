export default function RealTime({ setText }) {
  return (
    <div className="flex h-full">
      <img
        src="/real-time/real-time-navbar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "Use the navigation bar to move around to different pages and get help! We're currently on the real time's prediction's page!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <img
        src="/real-time/real-time-sidebar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "Over here you have a brief representation of the scale to classify cyclones! Below you get info about your current cyclone's category!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <div className="flex flex-col w-full">
        <img
          src="/real-time/real-time-topbar.png"
          className="w-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "Stay up to date with the current forecast's time! You can check in on the current average temperature and humidity too!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
        <img
          src="/real-time/real-time-midbar.png"
          className="w-full h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "Get the current status of the cyclone with the latest satellite captures! Along with this a processed view of the capture is provided for better inference!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
        <img
          src="/real-time/real-time-lowbar.png"
          className="w-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "This is where all the current predictions are displayed! Click on them to change their units, get info about the current category, and figure out how to handle natural disasters on spot!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
      </div>
    </div>
  );
}
