export default function TimeSeries({ setText }) {
  return (
    <div className="flex h-full">
      <img
        src="/time-series/time-series-navbar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "Use the navigation bar to move around to different pages and get help! We're currently on the time series prediction's page!"
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <img
        src="/time-series/time-series-sidebar.png"
        className="h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
        onMouseOver={() =>
          setText(
            "This is where the past, present, and forecasted data is shown! Feel free to pin the data points you want to check in on later! "
          )
        }
        onMouseLeave={() => setText("Hover To Explore!")}
      />
      <div className="flex flex-col w-full">
        <img
          src="/time-series/time-series-topbar.png"
          className="w-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "Stay up to date with the current forecast's time! You can check in on the current average temperature and humidity too!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
        <img
          src="/time-series/time-series-midbar.png"
          className="w-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
          onMouseOver={() =>
            setText(
              "Get your time series' data to a graph to visualize trends over time! Look into the current satellite imagery on the right!"
            )
          }
          onMouseLeave={() => setText("Hover To Explore!")}
        />
        <img
          src="/time-series/time-series-lowbar.png"
          className="w-full h-full hover:scale-110 transition ease-in-out delay-400 hover:shadow-[0_7px_29px_0px_rgba(255,255,255,255.2)] hover:rounded-md"
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
